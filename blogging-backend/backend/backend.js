const mysql = require('mysql2');
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const secretKey = process.env.BACKEND_SECRETKEY;
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "blog"
});

db.connect(err => {
    if (err) {
        throw err
    }
    else {
        console.log("Connected to MySQL");
    }

});




function generateToken(jsondata, options = {}) {
    // Make sure jsondata is an object, not an array (you might need to tweak this depending on what you need)
    if (!jsondata || typeof jsondata !== 'object') {
        throw new Error('Invalid jsondata. Must be an object.');
    }
    const defaultOptions = {
        issuer: 'blogging-backend',
        isAdmin: false,
        ...options,
    }
    return jwt.sign(jsondata,secretKey,defaultOptions)
}

function verifyToken(token) {
    if (!token) {
        throw new Error('Token is required');
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded);
        return [0,decoded];
    } catch (err) {
        return [1,"Invalid token"];
    }
}

async function hashPassword(password, salt = 10) {
    const hashed = await bycrpt.hash(password,salt);
    return hashed;
}
async function comparePassword(plainTextPassword,hashedPassword) {
    return await bycrpt.compare(plainTextPassword,hashedPassword);
} 

async function createaccount(username,email,password) {
    hash = bycrpt.hash(password, 10, (err, hash) => {
        if (err) throw err;
        password = hash;
        console.log("hash: ", hash)
        console.log("password: ", password, " hash: ", hash)
        db.query('INSERT INTO users (userName, email,password, isAdmin) VALUES (?, ?, ?,0)', [username,email,password],(err, result) => {
            if (err) {
                return error
            }
            console.log("created account");
            return "successfully created account";
        });
    });
}
async function deleteAccount(username, password) {
    if (!password || password.trim().length === 0 || !username || username.trim().length === 0) {
        return "password is blank!";
    }

    try {
        const result = await new Promise((resolve, reject) => {
            db.query('DELETE FROM users WHERE username = ?', [username], (err, result) => {
                if (err) reject("error");
                else resolve("success");
            });
        });
        return result;
    } catch (err) {
        return err; // will be "error"
    }
}


async function login(username,password) {
    db.query('SELECT password FROM users WHERE userName = ?',[username], (err, result) => {
        if (err) {
            console.log(err);
            return "server encounterd an error while logging in";
        }
        if (!comparePassword(password,result[0].password)) {
            return "username or password is incorrect";
        }
        if (password.length <= 0) {
            return "password is blank!";
        }
    })
}


function post(username, [title, text]) {
    db.query('SELECT userID FROM users WHERE userName = ?', [username], (err, result) => {
        if (err) {
            return "error occured while fetching userdata";
        }
        console.log(result);
        db.query('INSERT INTO posts (title, content, userID) VALUES (?, ?, ?)', [title, text, result], (err, result) => {
            if (err) {
                return "error occured while posting";
            }
            else {
                return "success";
            }
        })
    })
}
async function checkAccountExists(username, email) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE userName = ? OR email = ?', [username, email], (err, result) => {
            if (err) return reject(2);
            resolve(result.length > 0 ? 1 : 0);
        });
    });
}


module.exports = { createaccount, hashPassword, comparePassword, login, post, checkAccountExists,deleteAccount };