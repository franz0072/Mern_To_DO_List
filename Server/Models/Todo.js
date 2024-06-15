// Importing the mongoose module to interact with MongoDB
const mongoose = require('mongoose');

// Defining a Mongoose schema for the Todo model
const TodoSchema = new mongoose.Schema({
    // Represents the task description as a string
    task: String,
    // Represents the completion status of the task as a boolean, defaulting to false
    done: {
        type: Boolean,
        default: false
    }
});

// Creating a Mongoose model named "todos" using the TodoSchema
const TodoModel = mongoose.model("todos", TodoSchema);

// Exporting the TodoModel to be used in other parts of the application
module.exports = TodoModel;
