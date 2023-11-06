const express = require('express');
const fs = require('fs');
const path = require('path');
let notes = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// GET Route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });

// GET Route for notes db file
app.get('/api/notes', (req, res) => {
  notes = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));  
  res.json(notes)});


app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = generateUniqueId();
  //const notes = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
  notes.push(newNote);
  fs.writeFileSync('db/db.json', JSON.stringify(notes));
  res.json(newNote);
});

// DELETE Route for deleting a note by ID
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  const updatedNotes = notes.filter((note) => note.id !== noteId);
  fs.writeFileSync('db/db.json', JSON.stringify(updatedNotes, null, 2));
  res.json({ message: 'Note deleted' });
});

// Fallback route for default; place at end of others
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


// Start the server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

// Helper function to generate a unique ID
function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}