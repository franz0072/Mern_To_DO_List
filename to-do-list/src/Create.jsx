// Importing the useState and React modules from the 'react' library
import React, { useState } from 'react';
// Importing the axios library for making HTTP requests
import axios from 'axios';

// Defining the Create component
function Create({ fetchTodos }) {
    // Defining state for the task input field
    const [task, setTask] = useState('');

    // Function to handle adding a new task
    const handleAdd = () => {
        // Check if the task is empty or contains only whitespace
        if (!task.trim()) {
            // If empty, do nothing
            return;
        }

        // Make a POST request to add the task
        axios.post('http://localhost:3000/add', { task: task })
            .then(result => {
                // Call the fetchTodos function to update the task list
                fetchTodos();
                // Clear the task input field
                setTask('');
            })
            .catch(err => console.log(err));
    }

    // Render method for the Create component
    return (
        <div className='create_form'>
            {/* Input field for entering the task */}
            <input type="text" placeholder="Enter the task" value={task} onChange={(e) => setTask(e.target.value)} />
            {/* Button to add the task */}
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}

// Exporting the Create component to make it available for use in other files
export default Create;
