const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// --- Static File Serving ---

// 1. Serve the shared 'assets' folder
// This makes /assets/css/global.css available
app.use('/assessts', express.static(path.join(__dirname, 'assessts')));

// 2. Serve each page's folder as its own static route
// This is the key part! It allows 'home.html' to find 'home.css'
// using a relative path.
app.use('/home', express.static(path.join(__dirname, 'pages/home')));


// --- Page Routing ---

// 1. Define routes to serve the actual HTML pages
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/home/home.html'));
});

// 2. Add a root redirect to the home page
app.get('/', (req, res) => {
  res.redirect('/home');
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log('Access your pages:');
  console.log(`- http://localhost:${port}/home`);
});