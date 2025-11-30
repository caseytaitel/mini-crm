import { useState, useEffect } from "react";
import type { Note } from "../../types/Note";
import styles from "./NoteItem.module.css";

type Props = {
  note: Note;
  updateNote: (id: number, data: Partial<Note>) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  isSelected: boolean;
  onSelect: () => void;
};

export function NoteItem({ note, updateNote, deleteNote, isSelected, onSelect }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  // Sync when props change
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
      onClick={onSelect}
      className={isSelected ? styles.containerSelected : styles.container}
    >
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={styles.textarea}
          />

          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
          <button onClick={handleCancel} className={styles.button}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <strong>{note.title}</strong>
          <p>{note.body}</p>

          <div className={styles.buttonContainer}>
            <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} className={styles.button}>
              Edit
            </button>
            <button onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }} className={styles.button}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}