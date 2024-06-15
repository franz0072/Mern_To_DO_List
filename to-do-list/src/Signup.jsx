// Importing React and the useState hook from the 'react' library
import React, { useState } from "react";
// Importing Link and useNavigate from 'react-router-dom' for routing
import { Link, useNavigate } from "react-router-dom";
// Importing axios for making HTTP requests
import axios from "axios";

// Functional component for Signup form
function Signup() {
    // State hooks for managing form fields and error messages
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook for navigating between routes

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Form validation
        if (!name || !email || !password) {
            setError("All fields are required");
            return;
        }

        if (!validateEmail(email)) {
            setError("Invalid email address");
            return;
        }

        if (password.length < 4) {
            setError("Password must be at least 4 characters long");
            return;
        }

        // Submit form data
        axios
            .post("http://localhost:3000/register", { name, email, password })
            .then((result) => {
                console.log(result); // Log the result data to the console
                navigate("/"); // Navigate to the login page after successful registration
            })
            .catch((err) => console.error(err)); // Log any errors that occur during the registration process
    };

    // Function to validate email format using regular expression
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/; // Regular expression pattern for email validation
        return re.test(email); // Return true if the email matches the pattern, otherwise false
    };

    // Rendering the Signup form
    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {/* Signup form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        {/* Input field for name */}
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            className="form-control rounded-0"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Update name state on change
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        {/* Input field for email */}
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state on change
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        {/* Input field for password */}
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state on change
                        />
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                {/* Link to the login page */}
                <p>Already Have an Account</p>
                <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

// Exporting the Signup component as the default export
export default Signup;
