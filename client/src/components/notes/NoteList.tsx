import type { Note } from "../../types/Note";
import { NoteItem } from "./NoteItem";

type Props = {
  notes: Note[];
  updateNote: (id: number, data: Partial<Note>) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
};

export function NoteList({ notes, updateNote, deleteNote }: Props) {
  return (
    <div>
      {notes.map((n) => (
        <NoteItem
          key={n.id}
          note={n}
          updateNote={updateNote}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
}