import { useState } from "react";

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
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        type="text"
        placeholder="Note title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: 8, width: "100%", marginBottom: 8 }}
      />

      <textarea
        placeholder="Write a note..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{ padding: 8, width: "100%", height: 80 }}
      />

      <button type="submit" style={{ width: "100%", padding: 8, marginTop: 8 }}>
        Add Note
      </button>
    </form>
  );
}