import { useState } from "react";
import type { Note } from "../types/Note";
import { NoteList } from "../components/notes/NoteList";
import styles from "./NotesPanel.module.css";

type Props = {
  notes: Note[];
  selectedContactId: number | null;
  createNote: (data: Partial<Note>) => Promise<void>;
  updateNote: (id: number, data: Partial<Note>) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
};

export function NotesPanel({
  notes,
  selectedContactId,
  createNote,
  updateNote,
  deleteNote,
}: Props) {
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  if (!selectedContactId) {
    return (
      <div className={styles.container}>
        <h2>Notes</h2>
        <p>Select a contact to view notes.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Notes</h2>

      {/* Create Note */}
      <button
        onClick={() => createNote({ title: "New Note", body: "" })}
        className={styles.addButton}
      >
        + Add Note
      </button>

      {/* List */}
      <NoteList
        notes={notes}
        updateNote={updateNote}
        deleteNote={deleteNote}
        selectedNoteId={selectedNoteId}
        setSelectedNoteId={setSelectedNoteId}
      />
    </div>
  );
}
