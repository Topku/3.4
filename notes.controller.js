const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);

  saveNotes(notes);
  console.log(chalk.bgGreen("Note was added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("here is list of notes"));
  notes.forEach((note) => {
    console.log(note.id, chalk.red(note.title));
  });
}

async function removeNote(element) {
  const notes = await getNotes();
  const result = notes.filter((ele) => {
    return ele.id !== element;
  });
  await saveNotes(result);
}

async function updateNote(id, title) {
  const notes = await getNotes();
  for (let i = 0; i < 4; i++) {
    if (notes[i].id === id) {
      notes[i].title = title;
    }
  }
  saveNotes(notes);
  console.log(chalk.bgCyan("Note was updated"));
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  updateNote,
};
