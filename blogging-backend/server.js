require('dotenv').config();
const cors = require('cors');
const express = require('express');
const http = require('http');
const app = express();
const backend = require('./backend/backend.js')
const port = 5000;

app.use(cors());
app.use(express.json());
const server = http.createServer(app);


app.get('/', (req,res) => {
    return res.status(200).send("connected successfully");
});
app.post('/account/create', async (req,res) => {
    const existingAcc = await backend.checkAccountExists(req.body.username, req.body.email);
    if (existingAcc === 1) {
        return res.status(409).json({error : 'Conflict', message : 'username or email is already in use'})
    }
    const createRresponse = await backend.createaccount(req.body.username,req.body.email,req.body.password);
    if (createRresponse == "successfully created account")  {
        return res.status(201).json({error : 'none', message : 'successfully created user', 'code' : 201});
    }
    else {
        console.log(createRresponse)
    }
});
app.post('/account/login', (req,res) => {
    if (backend.login(req.body.username,req.body.password)) {
        return res.status(200).json({ error : 'none', message : 'successfully logged into user', 'code' : 200 });
    }
}) 
app.delete('/account/delete', async (req,res) => {
    console.log("delete request recived")
    var response = await backend.deleteAccount(req.body.username,req.body.password);
    console.log(response)
    if (response === "error") {
        return res.status(500).json({error : 'serverError', message : 'server encountered an error deleting user', 'code' : 500});
    }
    else {
        return res.status(200).json({error: 'none', message : 'successfully deleted user', 'code' : 200})
    }
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});