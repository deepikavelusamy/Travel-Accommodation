const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
require('dotenv').config()
const app = express();

const bcrypySalt = bcrypt.genSaltSync(12);
const jwtSecret = 'guwgOLihdjkeDFhiGFGuhfiuoqKJdjhsb';

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));


mongoose.connect(process.env.MONGO_URL);


app.get('/test',(req,res) => {
    res.json('test ok');
});

app.post('/register', async (req,res) => {
    const {name,email,password} = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcrypySalt),
        });
        res.json({userDoc});

    } catch(e){
        res.status(422).json(e);
    }
    
    
})

app.post('/login', async (req,res) => {
   const {email,password} = req.body;
   const userDoc = await User.findOne({email});
   if(userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if(passOk){
        jwt.sign({email:userDoc.email, id:userDoc._id},jwtSecret,{},(err,token) => {
            if(err) throw (err);
            res.cookie('token', token ).json('pass Ok'); 
        } );
        
   } else{
    res.status(422).json('pass not Ok');
   }
} else {
    res.json('not found');
   }
});

app.listen(4000);
