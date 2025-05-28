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
    console.log("create request recived")
    const existingAcc = await backend.checkAccountExists(req.body.username);
    console.log(existingAcc)
    if (existingAcc === 1) {
        return res.status(409).json({error : 'Conflict', message : 'account already exists'})
    }
    response = backend.createaccount(req.body.username,req.body.email,req.body.password);
    if (response == "successfully created account")  {
        return res.status(201).json({error : 'none', message : 'successfully created user', 'code' : 201});
    } else if(response == "username already exists") {
        console.log("username already exists");
        return res.status(400).json({ error : 'badRequest', message : 'username already exists', 'code' : 400 });
    }
});
app.post('/account/login', (req,res) => {
    if (backend.login(req.body.username,req.body.password)) {
        return res.status(200).json({ error : 'none', message : 'successfully logged into user', 'code' : 200 });
    }
}) 
app.delete('/account/delete', (req,res) => {
    console.log("delete request recived")
    const response = backend.deleteAccount(req.body.username,req.body.password);
    if (response == "success") {
        return res.status(204).json({ error : 'none', message : 'successfully deleted user', 'code' : 200 });
    }
    else if (response == "error occured while deleting account") {
        return res.status(400).json({ error : 'badRequest', message : 'error occured while deleting account', 'code' : 400 });
    }
    else if (response == "username or password is incorrect") {
        return res.status(401).json({ error : 'unauthorized', message : 'username or password is incorrect', 'code' : 401 });
    }
    
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});