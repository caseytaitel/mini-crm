import { useEffect, useState } from "react";
import { notesAPI } from "../api/notes";
import type { Note } from "../types/Note";

export function useNotes(contactId: number | null) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch notes when contact changes
  useEffect(() => {
    if (contactId === null) {
      setNotes([]);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const data = await notesAPI.getForContact(contactId);
        setNotes(data);
      } catch (err) {
        setError("Failed to load notes");
      } finally {
        setLoading(false);
      }
    })();
  }, [contactId]);

  // CREATE
  async function createNote(data: Partial<Note>): Promise<void> {
    if (contactId === null) return;

    const newNote = await notesAPI.create(contactId, data);
    setNotes((prev) => [newNote, ...prev]);
  }

  // UPDATE
  async function updateNote(id: number, data: Partial<Note>): Promise<void> {
    const updated = await notesAPI.update(id, data);
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? updated : n))
    );
  }

  // DELETE
  async function deleteNote(id: number): Promise<void> {
    await notesAPI.delete(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  return {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
  };
}