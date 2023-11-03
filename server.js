const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

const app = express();

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//TODO: Set Up Routes

// Start the server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);