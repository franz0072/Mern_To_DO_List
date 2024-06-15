// Importing necessary modules and components from React and other files
import React, { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsFillTrashFill, BsCheckCircleFill, BsPencilSquare } from "react-icons/bs";

// Defining the Home component
function Home() {
    // State hooks for managing state
    const [todos, setTodos] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editText, setEditText] = useState('');

    // useEffect hook to fetch todos when the component mounts
    useEffect(() => {
        fetchTodos();
    }, []);

    // Function to fetch todos from the server
    const fetchTodos = () => {
        axios.get("http://localhost:3000/get")
            .then((result) => setTodos(result.data))
            .catch((err) => console.log(err));
    };

    // Function to handle checkbox click
    const handleCheckboxClick = (id, done) => {
        axios.put(`http://localhost:3000/updateStatus/${id}`, { done })
            .then(() => {
                fetchTodos();
            })
            .catch((err) => console.log(err));
    };

    // Function to handle editing a task
    const handleEditTask = (id, text) => {
        setEditTaskId(id);
        setEditText(text);
    };

    // Function to handle updating a task
    const handleUpdateTask = (id) => {
        axios.put(`http://localhost:3000/updateTask/${id}`, { task: editText })
            .then(() => {
                setEditTaskId(null);
                setEditText('');
                fetchTodos();
            })
            .catch((err) => console.log(err));
    };

    // Function to handle canceling edit
    const handleCancelEdit = () => {
        setEditTaskId(null);
        setEditText('');
    };

    // Function to handle deleting a task
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/delete/${id}`)
            .then(() => {
                fetchTodos();
            })
            .catch((err) => console.log(err));
    };

    // Calculate completed and total tasks
    const completedCount = todos.filter((todo) => todo.done).length;
    const totalCount = todos.length;

    // Render method for the Home component
    return (
        <div className="home">
            {/* Heading for the To-Do List */}
            <h2>To-Do List</h2>
            {/* Render the Create component */}
            <Create fetchTodos={fetchTodos} />
            {/* Summary of completed and total tasks */}
            <h3>Summary</h3>
            <p>{`${completedCount}/${totalCount} tasks completed`}</p>
            {/* Display pending tasks */}
            <h3>Pending Tasks</h3>
            {/* Check if there are no pending tasks */}
            {todos.length === 0 ? (
                <div className="no-record">
                    <h2>No pending tasks</h2>
                </div>
            ) : (
                // Map through pending tasks
                todos.map((todo) => !todo.done && (
                    <div className="task" key={todo._id}>
                        <div className="checkbox" onClick={() => handleCheckboxClick(todo._id, !todo.done)}>
                            {/* Render appropriate icon for checkbox */}
                            <BsCircleFill className="icon" />
                            {/* Conditionally render input field for editing task */}
                            {editTaskId === todo._id ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onClick={(e) => e.stopPropagation()} // Stop propagation here
                                />
                            ) : (
                                // Render task text
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            )}
                        </div>
                        <div>
                            <span>
                                {/* Conditionally render update/cancel buttons */}
                                {editTaskId === todo._id ? (
                                    <>
                                        <button className="update" onClick={() => handleUpdateTask(todo._id)}>Update</button>
                                        <button className="cancel" onClick={handleCancelEdit}>Cancel</button>
                                    </>
                                ) : (
                                    // Render edit icon
                                    <BsPencilSquare className="icon" onClick={() => handleEditTask(todo._id, todo.task)} />
                                )}
                                {/* Render delete icon */}
                                <BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} />
                            </span>
                        </div>
                    </div>
                ))
            )}
            {/* Display completed tasks */}
            <h3>Completed Tasks</h3>
            {/* Check if there are completed tasks */}
            {todos.length !== 0 && todos.some((todo) => todo.done) ? (
                // Map through completed tasks
                todos.map((todo) => todo.done && (
                    <div className="task" key={todo._id}>
                        <div className="checkbox" onClick={() => handleCheckboxClick(todo._id, !todo.done)}>
                            {/* Render appropriate icon for checkbox */}
                            <BsCheckCircleFill className="icon" />
                            {/* Render task text with line-through */}
                            <p className="line_through">{todo.task}</p>
                        </div>
                        <div>
                            <span>
                                {/* Render edit and delete icons */}
                                <BsPencilSquare className="icon" onClick={() => handleEditTask(todo._id, todo.task)} />
                                <BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} />
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                // Display message if there are no completed tasks
                <div className="no-record">
                    <h2>No completed tasks</h2>
                </div>
            )}
        </div>
    );
}

// Exporting the Home component to make it available for use in other files
export default Home;
