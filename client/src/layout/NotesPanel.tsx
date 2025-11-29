import type { Note } from "../types/Note";
import { NoteList } from "../components/notes/NoteList";

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
  if (!selectedContactId) {
    return (
      <div style={{ width: "55%", padding: 16 }}>
        <h2>Notes</h2>
        <p>Select a contact to view notes.</p>
      </div>
    );
  }

  return (
    <div style={{ width: "55%", padding: 16 }}>
      <h2>Notes</h2>

      {/* Add Note Button */}
      <button
        onClick={() => createNote({ title: "New Note", body: "" })}
        style={{ marginBottom: 16 }}
      >
        + Add Note
      </button>

      {/* Note List */}
      <NoteList notes={notes} updateNote={updateNote} deleteNote={deleteNote} />
    </div>
  );
}