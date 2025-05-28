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
app.post('/account/create', (req,res) => {
    
});
app.post('/account/login', (req,res) => {
    
}) 

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});