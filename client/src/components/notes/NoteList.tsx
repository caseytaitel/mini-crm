import type { Note } from "../../types/Note";
import { NoteItem } from "./NoteItem";

interface Props {
  notes: Note[];
  loading: boolean;
  selectedContactId: number | null;
}

export function NoteList({ notes, loading, selectedContactId }: Props) {
  if (!selectedContactId) return <div>Select a contact to view notes</div>;
  if (loading) return <div>Loading notes...</div>;
  if (!notes.length) return <div>No notes yet</div>;

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 4 }}>
      {notes.map((n) => (
        <NoteItem key={n.id} note={n} />
      ))}
    </div>
  );
}