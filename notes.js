const fs = require("fs");

const getNotes = () => {
  return "Your notes";
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesTokeep = notes.filter(function (note) {
    return note.title !== title;
  });

  saveNotes(notesTokeep);
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("New note added!");
  } else {
    console.log("Note title taken!");
  }
};

const listNotes = () => {
    const notes = loadNotes();

    notes.forEach(element => {
        console.log(element.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const findNote = notes.find((note) => note.title === title);

    if (findNote) {
        console.log(findNote.title, findNote.body);
    } else {
        console.log("Error");
    }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
