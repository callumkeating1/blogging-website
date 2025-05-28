const mysql = require('mysql2');
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.BACKEND_SECRETKEY;
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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








async function hashPassword(password, salt = 10) {
    const hashed = await bycrpt.hash(password,salt);
    return hashed;
}
async function comparePassword(plainTextPassword,hashedPassword) {
    return await bycrpt.compare(plainTextPassword,hashedPassword);
}

function createaccount(username,email,password) {
    bycrpt.hash(password, 10, (err, hash) => {
        if (err) throw err;
        password = hash;
    });
    db.query('INSERT INTO users (userName, email,password, isAdmin) VALUES (?, ?, ?,0)', [username,email,password],(err, result) => {
        if (err) throw err;
        console.log(result);
        return "successfully created account";
      });
}


function login(username,password) {
    db.query('SELECT password FROM users WHERE userName = ?',[username], (err, result) => {
        if (err) {
            console.log(err);
            return "server encounterd an error while logging in";
        }
        if (comparePassword(password,result[0].password)) {

        } else {
            return "username or password is incorrect";
        }
        if (password.length <= 0) {
            return "password is blank!";
        }
    })
}


function post(username, [title, text]) {
    db.query('SELECT userID FROM users WHERE userName = ?'[username], (err, result) => {
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


module.exports = [ createaccount, hashPassword, comparePassword, login ];


/*
return res.status(200).json({ error : 'badRequest', message : 'username or password is incorrect', 'code': 200 });
return res.status(500).json({ error : 'serverError', message : 'server encountered an unknown error while logging in', 'code' : 500 });
return res.status(200).json({ error: 'badRequest', message : 'password is blank!', 'code': 200 });




*/