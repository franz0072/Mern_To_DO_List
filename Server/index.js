// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importing Todo and User models
const TodoModel = require('./Models/Todo');
const UserModel = require('./Models/User');

// Initializing express application
const app = express();
app.use(cors());
app.use(express.json());

// Connecting to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/todos');

// Route to update task status (checkbox)
app.put('/updateStatus/:id', (req, res) => {
    const { id } = req.params;
    const { done } = req.body;
    TodoModel.findByIdAndUpdate(id, { done })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Route to update task text (edit icon)
app.put('/updateTask/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    TodoModel.findByIdAndUpdate(id, { task })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Route to delete a task
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Route to add a new task
app.post('/add', (req, res) => {
    const { task } = req.body;
    TodoModel.create({ task })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Route to get all tasks
app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Route for user login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("The password is incorrect")
                }
            } else {
                res.json("No record existed")
            }
        });
});

// Route for user registration
app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(Users => res.json(Users))
        .catch(err => res.json(err));
});

// Starting the server on port 3000
app.listen(3000, () => {
    console.log("Server is Running");
});
