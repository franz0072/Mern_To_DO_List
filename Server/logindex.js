const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require('./Models/User')

const app = express( )
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/todos');

// api


app.post('/register' , (req, res) => {
    UserModel.create(req.body)
    .then( Users => res.json(Users))
    .catch(err => res.json(err))

})


app.listen(4000, () => {
    console.log("Server is Running");
});

