const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User.js');
require('dotenv').config()
const app = express();

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);


app.get('/test',(req,res) => {
    res.json('test ok');
});

app.post('/register',(req,res) => {
    const {name,email,password} = req.body;
    User.create({
        name,
        email,
        password,
    });
    res.json({name,email,password});
})

app.listen(4000);
