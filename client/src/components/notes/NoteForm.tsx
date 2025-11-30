import { useState } from "react";
import styles from "./NoteForm.module.css";

interface Props {
  onCreate: (data: any) => void;
}

export function NoteForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;

    await onCreate({ title, body });

    setTitle("");
    setBody("");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Note title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />

      <textarea
        placeholder="Write a note..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className={styles.textarea}
      />

      <button type="submit" className={styles.submitButton}>
        Add Note
      </button>
    </form>
  );
}