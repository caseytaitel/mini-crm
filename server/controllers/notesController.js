const notesService = require("../services/notesService");

exports.getNotesForContact = async (req, res) => {
  const contactId = Number(req.params.contactId);
  const notes = await notesService.getNotesForContact(contactId);
  res.json(notes);
};

exports.createNote = async (req, res) => {
  const contactId = Number(req.params.contactId);
  const note = await notesService.createNote(contactId, req.body);
  res.json(note);
};

exports.updateNote = async (req, res) => {
  const noteId = Number(req.params.noteId);
  const updated = await notesService.updateNote(noteId, req.body);
  res.json(updated);
};

exports.deleteNote = async (req, res) => {
  const noteId = Number(req.params.noteId);
  const deleted = await notesService.deleteNote(noteId);
  res.json(deleted);
};