const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
  console.log(chalk.bgGreen("note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });

  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function editNote(id, title) {
  const notes = await getNotes();
  const editedNotes = notes.map((note) => {
    return note.id === id ? { ...note, title: title || note.title } : note;
  });
  
  await saveNotes(editedNotes);

  console.log(chalk.bgGreen("note was edited!"));
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}
async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("There is a list of notes"));

  notes.forEach((note) => console.log(chalk.blue(note.id, note.title)));
}

async function removeNote(id) {
  const notes = await getNotes();
  const clearedNotes = notes.filter((note) => note.id !== id);

  await saveNotes(clearedNotes);
}

module.exports = {
  addNote,
  printNotes,
  editNote,
  removeNote,
};
