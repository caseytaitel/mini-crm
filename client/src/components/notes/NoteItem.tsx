import { useState, useEffect } from "react";
import type { Note } from "../../types/Note";

type Props = {
  note: Note;
  updateNote: (id: number, data: Partial<Note>) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
};

export function NoteItem({ note, updateNote, deleteNote }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  // Sync local state with updated props
  useEffect(() => {
    setTitle(note.title);
    setBody(note.body);
  }, [note.title, note.body]);

  async function handleSave() {
    await updateNote(note.id, { title, body });
    setIsEditing(false);
  }

  function handleCancel() {
    setTitle(note.title);
    setBody(note.body);
    setIsEditing(false);
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 12,
        marginBottom: 8,
        borderRadius: 4,
      }}
    >
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
          />

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
          />

          <button onClick={handleSave} style={{ marginRight: 8 }}>
            Save
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <strong>{note.title}</strong>
          <p>{note.body}</p>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}