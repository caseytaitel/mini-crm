const notesService = require("../services/notesService");

exports.getNotesForContact = async (req, res) => {
  const notes = await notesService.getNotesForContact(req.params.contactId);
  res.json(notes);
};

exports.createNote = async (req, res) => {
  const note = await notesService.createNote(req.params.contactId, req.body);
  res.json(note);
};

exports.updateNote = async (req, res) => {
  const updated = await notesService.updateNote(req.params.noteId, req.body);
  res.json(updated);
};

exports.deleteNote = async (req, res) => {
  const deleted = await notesService.deleteNote(req.params.noteId);
  res.json(deleted);
};
