const notes = require("express").Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);

  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// notes.get("/:text", (req, res) => {
//     if(req.params.text) {
//         const 
//     }
// })

notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if(title && text) {
    const newNote = {
        title, 
        text,
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
        status: 'success',
        body: newNote
    };

    res.json(response);
} else {
    res.json('Error in Posting Note')
}
});



module.exports = notes;
