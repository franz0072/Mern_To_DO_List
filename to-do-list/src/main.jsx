// Importing necessary modules and components from React and other files
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Rendering the App component into the root element of the HTML document
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrapping the App component with React Strict Mode for additional checks and warnings
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
