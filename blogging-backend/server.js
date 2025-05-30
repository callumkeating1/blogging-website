import "dotenv/config";
import cors from "cors";
import express from "express";
import http from "http";
import backend from "./backend/backend.js";

const app = express();
const port = 5000;

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
app.post("/account/create", async (req,res) => {
    const existingAcc = await backend.checkAccountExists(req.body.username, req.body.email);
    if (existingAcc === 1) {
        return res.status(409).json({ error : "Conflict", message : "username or email is already in use" });
    }
    const createResponse = await backend.createaccount(req.body.username,req.body.email,req.body.password);
    if (createResponse == "successfully created account")  {
        return res.status(201).json({ error : "none", message : "successfully created user", "code" : 201 });
    }
    else {
        console.log(createResponse);
    }
});
app.post("/account/login", async (req,res) => {
    const code = await backend.login(req.body.username,req.body.password);
    if (code === "username or password is incorrect") {
        return res.status(400).json({ error : "badRequest", message : "username or password is incorrect", code : 400 });
    }
    else {
        return res.status(200).json({ error : "none", message : "successfully logged into user", code : 200, "jwt" : code });
    }
});
app.delete("/account/delete", async (req,res) => {
    console.log("delete request recived");
    var response = await backend.deleteAccount(req.body.username,req.body.password);
    console.log(response);
    if (response === "error") {
        console.log("error");
        return res.status(500).json({ error : "serverError", message : "server encountered an error deleting user", "code" : 500 });
    }
    else if (response === "success") {
        console.log("success");
        return res.status(204).json({ error: "none", message: "successfully deleted user" });
    } else {
        console.log("error 2");
        return res.status(500).json({ error : "serverError", message : "server encountered an error deleting user", "code" : 500 });
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
