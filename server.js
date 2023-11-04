const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json');

const PORT = 3001;

const app = express();

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

//TODO: Set Up Routes

// GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });

// GET Route for notes db file
app.get('/api/terms', (req, res) => res.json(notes));



// Start the server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);