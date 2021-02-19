const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

require('./models/User');

const requireToken = require('./middleware/requireToken')
const Auth = require('./routes/Auth')
app.use(bodyParser.json())
app.use(Auth)

const port = 3000;

mongoose.connect('mongodb://localhost/db_letspay', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected',()=>{
    console.log("Successfully connect to MongoDB");
});

mongoose.connection.on('error',(err)=>{
    console.log("Cannot connect to MongoDB, ", err);
});

app.get('/',requireToken,(req,res)=>{
    res.send({id:req.user._id, email:req.user.email, name:req.user.name})
})

app.listen(port,()=>{
    console.log("Server running on port "+ port);
});