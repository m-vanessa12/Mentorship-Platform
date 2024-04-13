import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import Login from './signup-login/Login.js';
import App from './App.js';

// dotenv.config()


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
     <App />

    
  </React.StrictMode>
);

//reportWebVitals();
