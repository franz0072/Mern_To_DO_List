// Importing necessary modules and components from React and other files
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Defining the Login component
function Login() {
    // State hooks for managing state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form validation
        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        if (password.length < 4) {
            setError('Password must be at least 4 characters long');
            return;
        }

        // Make API call to login
        axios.post("http://localhost:3000/login", { email, password })
            .then(response => {
                console.log(response.data);
                // Check if login was successful
                if (response.data === "Success") {
                    // Redirect to home page on successful login
                    navigate('/home');
                } else {
                    // Display login failed message
                    setError('Login failed. Incorrect email or password.');
                }
            })
            .catch(error => {
                console.error('Login error:', error);
                // Display login failed message
                setError('Login failed. Please try again later.');
            });
    };

    // Render method for the Login component
    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                {/* Heading for the login form */}
                <h2>Login</h2>
                {/* Display error message if there is any */}
                {error && <div className="alert alert-danger">{error}</div>}
                {/* Login form */}
                <form onSubmit={handleSubmit}>
                    {/* Email input field */}
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* Password input field */}
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* Login button */}
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
                {/* Link to navigate to the signup page */}
                <p>Don't Have an Account</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    SignUp
                </Link>
            </div>
        </div>
    );
}

// Exporting the Login component to make it available for use in other files
export default Login;
