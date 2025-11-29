import type { Note } from "../types/Note";
import { NoteForm } from "../components/notes/NoteForm";
import { NoteList } from "../components/notes/NoteList";

type Props = {
  notes: Note[];
  selectedContactId: number | null;
  createNote: (data: Partial<Note>) => Promise<void>;
  loading: boolean;
};

export function NotesPanel({
  notes,
  selectedContactId,
  createNote,
  loading,
}: Props) {
  return (
    <div style={{ width: "55%", padding: 16 }}>
      <h2>Notes</h2>

      {!selectedContactId && <p>Select a contact to view notes.</p>}

      {selectedContactId && (
        <>
          <NoteForm onCreate={createNote} />
          <NoteList
            notes={notes}
            loading={loading}
            selectedContactId={selectedContactId}
          />
        </>
      )}
    </div>
  );
}