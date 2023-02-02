const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true  }));
app.use('/api', api);

app.use(express.static('public'));


app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// app.delete("/notes/:noteId", (req, res) => {
//   const noteId = req.params.noteId;
//   console.log("req.params: ", noteId);
//   readFromFile("./db/db.json").then((data) => {
//     const notes = JSON.parse(data);
//     console.log("notes: ", notes);
//     const filteredNotes = notes.filter((note) => note.noteId !== noteId);
//     console.log("Fnotes: ", filteredNotes);
//     return filteredNotes;
//   })
//       .then((filteredNotes) => {
//         writeToFile("./db/db.json", JSON.stringify(filteredNotes))
//           .then(() => {
//             res.json(`Item ${noteId} has been deleted 🗑️`);
//           });
//       });
// });


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);