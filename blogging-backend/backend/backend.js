import mysql from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as fs from "fs";
const secretKey = fs.readFileSync("./private.key", "utf8");
const publicKey = fs.readFileSync("./public.key", "utf8");

export const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "blog"
});

db.connect(err => {
    if (err) {
        throw err;
    }
    else {
        console.log("Connected to MySQL");
    }

});



async function hashPassword(password, salt = 10) {
    const hashed = await bcrypt.hash(password,salt);
    return hashed;
}
async function comparePassword(plainTextPassword,hashedPassword) {
    return await bcrypt.compare(plainTextPassword,hashedPassword);
}

async function createaccount(username,email,password) {
    try{
        const output = await new Promise((resolve,reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) throw err;
                password = hash;
                db.query("INSERT INTO users (userName, email,password, isAdmin) VALUES (?, ?, ?,0)", [username,email,password],(err) => {
                    if (err) {
                        reject("server encounted error");
                    }
                    console.log("created account");
                    resolve("successfully created account");
                });
            });
        });
        return output;
    }
    catch (err) {
        return err;
    }
}
async function deleteAccount(username, password) {

    if (!password || password.trim().length === 0 || !username || username.trim().length === 0) {
        return "password is blank!";
    }

    try {
        const result = await new Promise((resolve, reject) => {
            db.query("DELETE FROM users WHERE username = ?", [username], (err) => {
                if (err) reject("error");
                else resolve("success");
            });
        });
        return result;
    } catch (err) {
        return err;
    }
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
        return decoded;
    } catch (error) {
        console.error("Token verification error:", error.message);
        return null;
    }
}
async function login(username,password) {
    try {
        const output = await new Promise((resolve,reject) => {
            db.query("SELECT id, password, isAdmin FROM users WHERE userName = ?", [username], (err, result) => {
                if (err) {
                    console.log(err);
                    return reject("server encounterd an error while logging in");
                }
                if (result.length <= 0) {
                    return reject("username or password is incorrect");
                }
                if (!comparePassword(password,result[0].password)) {
                    return reject("username or password is incorrect");
                }
                if (password.length <= 0) {
                    return reject("password is blank!");
                }

                let jwtData = {
                    username: username,
                    id: result[0].id,
                    isAdmin: result[0].isAdmin
                };
                const webToken = jwt.sign(jwtData,secretKey,{ algorithm: "RS256",expiresIn: "30d" });
                console.log(webToken);
                resolve(webToken);
            });
        });
        return output;
    }
    catch (err) {
        return err;
    }
}
function refreshToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey, {
            algorithms: ["RS256"]
        });

        const payload = { ...decoded };
        delete payload.iat;
        delete payload.exp;
        delete payload.nbf;

        const newToken = jwt.sign(payload, secretKey, {
            algorithm: "RS256",
            expiresIn: "30d"
        });

        return newToken;
    } catch (err) {
        console.error("Failed to refresh token:", err);
        return null;
    }
}

function post(username, [title, text], token) {
    db.query("SELECT userID FROM users WHERE userName = ?", [username], (err, result) => {
        if (err) {
            return "error occured while fetching userdata";
        }
        const jwtToken = verifyToken(token);
        console.log(jwtToken);

        console.log(result);
        db.query("INSERT INTO posts (title, content, userID) VALUES (?, ?, ?)", [title, text, result], (err) => {
            if (err) {
                return "error occured while posting";
            }
            else {
                return "success";
            }
        });
    });
}
async function checkAccountExists(username, email) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE userName = ? OR email = ?", [username, email], (err, result) => {
            if (err) return reject(2);
            resolve(result.length > 0 ? 1 : 0);
        });
    });
}


export default {
    createaccount,
    hashPassword,
    comparePassword,
    login,
    post,
    checkAccountExists,
    deleteAccount,
    refreshToken
};
