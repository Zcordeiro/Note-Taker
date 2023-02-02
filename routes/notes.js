const notes = require("express").Router();
const { json } = require("express");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");
let { savedNotes } = require("../db/db.json");

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.get("/:noteId", (req, res) => {
  const noteId = req.params;
  console.log(noteId);
  readFromFile("./db/db.json").then((data) => {
    const notes = JSON.parse(data);
    const selectedNote = notes.find((note) => note.noteId === noteId);
    return selectedNote.length > 0
      ? res.json(selectedNote)
      : res.json("No note with that ID");
  });
});



notes.delete("/:noteId", (req, res) => {
  const noteId = req.params;

  console.log("req.params: ", noteId);
  for (let key in noteId) {
    console.log(key, ": ", noteId[key])}
  readFromFile("./db/db.json").then((data) => {
    const notes = JSON.parse(data);
    // console.log("notes: ", notes);
    const filteredNotes = notes.filter((note) => note.noteId !== noteId);
    // console.log("Fnotes: ", filteredNotes);
    return filteredNotes;
  });
  //     .then((filteredNotes) => {
  //       writeToFile("./db/db.json", JSON.stringify(filteredNotes))
  //         .then(() => {
  //           res.json(`Item ${noteId} has been deleted 🗑️`);
  //         });
  //     });
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      noteId: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in Posting Note");
  }
});

// function deleteNote(id, notesArray) {
//   for (let i = 0; i < notesArray.length; i++) {
//     let note = notesArray[i];

//     if (note.id == id) {
//       notesArray.splice(i, 1);
//       fs.writeFileSync(
//         path.join(__dirname, "./db/db.json"),
//         JSON.stringify(notesArray, null, 2)
//       );

//       break;
//     }
//   }
// }

//   notes.delete('/:noteId', (req, res) => {
//     console.log(req.params)
//     deleteNote(req.params, savedNotes);
//     res.json(true);
//   });

module.exports = notes;
