const yargs = require("yargs");
const pcg = require("./package.json");
const { addNote, printNotes, removeNote } = require("./notes.controller");

yargs.version(pcg.version);

yargs.command({
  command: "add",
  describe: "add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "print all notes",
  async handler() {
   printNotes()
  },
});

yargs.command({
    command: "remove",
    describe: "remove note by id",
    builder: {
        id: {
          type: "string",
          describe: "id to remove",
          demandOption: true,
        },
      },
    async handler({id}) {
     await removeNote(id)
    },
  });

yargs.parse();
