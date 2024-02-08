// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser')

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
// Spin up the server
// Callback to debug
const port = 8000;
const server = app.listen(port, listening);

function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
};

// Initialize all route with a callback function
// Callback function to complete GET '/all'
// GET route that returns the projectData object
app.get('/all', (req, res) => {
    res.send(projectData);
});

// Post Route
// POST route that adds incoming data to projectData
app.post('/all', (req, res) => {
    const { temperature, date, userResponse } = req.body;

    projectData.temperature = temperature;
    projectData.date = date;
    projectData.userResponse = userResponse;

    res.send(projectData);
});