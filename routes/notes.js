const notes = require("express").Router();
const { json } = require("express");
const { readFromFile, writeToFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.get("/:title", (req, res) => {
  const titleText = req.params.title;
  console.log(titleText);
  readFromFile("./db/db.json").then((data) => {
    const notes = JSON.parse(data);
    const selectedNote = notes.find((note) => note.id === titleText);
    return selectedNote.length > 0
      ? res.json(selectedNote)
      : res.json("No note with that ID");
  });
});



notes.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  console.log("req.params: ", noteId);
  readFromFile("./db/db.json")
  .then((data) => JSON.parse(data))
  .then((json) => {
    const notes = json.filter((note) => note.id !== noteId);
    console.log("notes: ", notes);

    writeToFile("./db/db.json", notes);

    res.json('please work')
  })
 
  });

notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
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

module.exports = notes;
