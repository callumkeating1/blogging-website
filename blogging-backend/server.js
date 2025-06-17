import "dotenv/config";
import cors from "cors";
import express from "express";
import http from "http";
import backend from "./backend/backend.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const server = http.createServer(app);


app.post("/", async (req, res) => {

    if (!req.body || typeof req.body !== "object") {
        return res.status(400).json({ error: "badRequest", message: "Missing or invalid body" });
    }

    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: "Token not provided" });
    }

    const refreshedToken = backend.refreshToken(token);

    if (!refreshedToken) {
        return res.status(401).json({ error : "badRequest", message : "Invalid or malformed token" });
    }

    return res.status(200).json({ jwt : refreshedToken });
});




app.get("/testcon", async (req, res) => {
    return res.status(200).json({ message : "connected!" });
});
app.post("/account/create", async (req,res) => {
    console.log("create request received");
    const existingAcc = await backend.checkAccountExists(req.body.username, req.body.email);
    if (existingAcc === 1) {
        console.log("account exists already");
        return res.status(409).json({ error : "Conflict", message : "username or email is already in use" });
    }
    const createResponse = await backend.createAccount(req.body.username,req.body.email,req.body.password);
    if (createResponse === "successfully created account")  {
        console.log("created account");
        return res.status(201).json({ message : "successfully created user", "code" : 201 });
    }

});




app.post("/account/login", async (req,res) => {
    const code = await backend.login(req.body.username,req.body.password);
    if (code === "username or password is incorrect") {
        return res.status(400).json({ error : "badRequest", message : "username or password is incorrect", code : 400 });
    }
    else {
        return res.status(200).json({ message : "successfully logged into user", code : 200, "jwt" : code });
    }
});




app.delete("/account/delete", async (req,res) => {
    var response = await backend.deleteAccount(req.body.username,req.body.password);
    if (response === "error") {
        return res.status(500).json({ error : "serverError", message : "server encountered an error deleting user", "code" : 500 });
    }
    else if (response === "success") {
        return res.status(204).json({ message: "successfully deleted user" });
    } else {
        return res.status(500).json({ error : "serverError", message : "server encountered an error deleting user", "code" : 500 });
    }
});




app.post("/post", async (req, res) => {
    const { title, text, jwt } = req.body;

    if (!text || !title) {
        return res.status(400).json({ message: "no contents in post" });
    }
    if (!jwt) {
        return res.status(401).json({ message: "no token provided by user" });
    }

    try {
        await backend.post(title, text, jwt);
        return res.status(201).json({ message: "successfully posted" });
    } catch (err) {
        console.error("Post Error:", err);
        return res.status(500).json({ error: "serverError", message: "failed to post" });
    }
});




app.post("/post/delete", async (req,res) => {
    const { postID, jwt } = req.body;
    try{

        await backend.deletePost(postID, jwt);
    } catch {
        return res.status(500).json({ error : "serverError", message : "error while trying to delete post" });
    }


    return res.status(410).json({ message : "successfully deleted message" });
});





server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
export default server;
