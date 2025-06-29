import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as fs from "fs";

const secretKey = fs.readFileSync("./private.key", "utf8");
const publicKey = fs.readFileSync("./public.key", "utf8");

export const db = mysql.createPool({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "blog"
});

async function hashPassword(password, salt = 10) {
    return await bcrypt.hash(password, salt);
}

async function comparePassword(plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
}

async function createAccount(username, email, password) {
    const hashed = await hashPassword(password);
    await db.query(
        "INSERT INTO users (userName, email, password, isAdmin) VALUES (?, ?, ?, 0)",
        [username, email, hashed]
    );
    return "successfully created account";
}

async function deleteAccount(username, password) {
    if (!username?.trim() || !password?.trim()) {
        return "password is blank!";
    }

    await db.query("DELETE FROM users WHERE username = ?", [username]);
    return "success";
}

async function login(username, password) {
    const [result] = await db.query(
        "SELECT id, password, isAdmin FROM users WHERE userName = ?",
        [username]
    );

    if (result.length === 0) {
        return "username or password is incorrect";
    }

    const valid = await comparePassword(password, result[0].password);
    if (!valid) {
        return "username or password is incorrect";
    }

    const jwtData = {
        username,
        id: result[0].id,
        isAdmin: result[0].isAdmin
    };

    return jwt.sign(jwtData, secretKey, {
        algorithm: "RS256",
        expiresIn: "30d"
    });
}

function refreshToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey, { algorithms: ["RS256"] });

        const payload = { ...decoded };
        delete payload.iat;
        delete payload.exp;
        delete payload.nbf;

        return jwt.sign(payload, secretKey, {
            algorithm: "RS256",
            expiresIn: "30d"
        });
    } catch {
        return null;
    }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
    } catch {
        return null;
    }
}

async function post(title, text, token) {
    const tokenData = verifyToken(token);
    if (!tokenData) return "invalid token";

    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [tokenData.username]);
    if (rows.length === 0) return "user doesn't exist";
    if (rows[0].id !== tokenData.id) return "malformed token";
    if (text.length > 10000 || title.length > 255) return "length too long";

    await db.query("INSERT INTO posts (userID, title, contents) VALUES (?, ?, ?)", [
        tokenData.id,
        title,
        text
    ]);

    return "posted successfully";
}

async function deletePost(postID, jwt) {
    const decoded = verifyToken(jwt);
    if (!decoded) return "no token";

    const [posts] = await db.query("SELECT * FROM posts WHERE id = ?", [postID]);
    if (posts.length === 0) return "post not found";
    if (posts[0].userID !== decoded.id) return "unauthorized";

    await db.query("DELETE FROM posts WHERE id = ?", [postID]);
    return "deleted";
}

async function checkAccountExists(username, email) {
    const [result] = await db.query(
        "SELECT * FROM users WHERE userName = ? OR email = ?",
        [username, email]
    );
    return result.length > 0 ? 1 : 0;
}

async function getPost() {
    const [posts] = await db.query("SELECT * FROM posts");
    console.log(posts);
    return posts;
}

export default {
    createAccount,
    hashPassword,
    comparePassword,
    login,
    post,
    deletePost,
    checkAccountExists,
    deleteAccount,
    refreshToken,
    getPost
};
