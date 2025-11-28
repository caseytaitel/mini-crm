const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

router.get("/contact/:contactId", notesController.getNotesForContact);
router.post("/contact/:contactId", notesController.createNote);
router.put("/:noteId", notesController.updateNote);
router.delete("/:noteId", notesController.deleteNote);

module.exports = router;
