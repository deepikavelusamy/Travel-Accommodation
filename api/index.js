const express =require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const cors = require('cors');
const app = express();

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173/',
}));


app.get('/test',(req,res) => {
    res.json('test ok');
});

app.listen(4000);