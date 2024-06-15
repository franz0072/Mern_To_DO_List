// Importing the useState hook from the 'react' library
import { useState } from 'react';
// Importing the CSS file for styling
import './App.css';
// Importing the Bootstrap CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css';
// Importing the Home component from the './Home' file
import Home from './Home';
// Importing the Signup component from the './Signup' file
import Signup from './Signup';
// Importing necessary components from the 'react-router-dom' library
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importing the Login component from the './Login' file

import Login from './Login';

// Defining the App component
function App() {
  // Render method for the App component
  return (
      // BrowserRouter component to enable routing
      <BrowserRouter>
        {/* Routes component to define route paths */}
        <Routes>
          {/* Route for the '/register' path, rendering the Signup component */}
          <Route path="/register" element={<Signup />}></Route>
          {/* Route for the '/' path, rendering the Login component */}
          <Route path="/" element={<Login />}></Route>
          {/* Route for the '/home' path, rendering the Home component */}
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

// Exporting the App component to make it available for use in other files
export default App;




