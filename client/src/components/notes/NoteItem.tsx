import type { Note } from "../../types/Note";

interface Props {
  note: Note;
}

export function NoteItem({ note }: Props) {
  return (
    <div
      style={{
        padding: "12px",
        borderBottom: "1px solid #eee",
      }}
    >
      {note.title && (
        <div style={{ fontWeight: "bold", marginBottom: 4 }}>
          {note.title}
        </div>
      )}
      <div>{note.body}</div>
      <div style={{ fontSize: 12, marginTop: 6, color: "#777" }}>
        {new Date(note.createdAt).toLocaleString()}
      </div>
    </div>
  );
}