import { useState } from "react";
import { useContacts } from "./hooks/useContacts";
import { ContactList } from "./components/contacts/ContactList";
import { ContactForm } from "./components/contacts/ContactForm";
import { useNotes } from "./hooks/useNotes";
import { NoteList } from "./components/notes/NoteList";
import { NoteForm } from "./components/notes/NoteForm";

export default function App() {
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);

  const {
    contacts,
    loading: contactsLoading,
    createContact,
  } = useContacts();

  const {
    notes,
    loading: notesLoading,
    createNote,
  } = useNotes(selectedContactId);

  return (
    <div style={{ display: "flex", padding: 20, gap: 20 }}>
      <div style={{ width: "30%" }}>
        <h2>Contacts</h2>

        <ContactForm onCreate={createContact} />

        <ContactList
          contacts={contacts}
          loading={contactsLoading}
          selectedContactId={selectedContactId}
          onSelect={setSelectedContactId}
        />
      </div>

      <div style={{ width: "70%" }}>
        <h2>Notes</h2>

        {selectedContactId && (
          <NoteForm onCreate={createNote} />
        )}

        <NoteList
          notes={notes}
          loading={notesLoading}
          selectedContactId={selectedContactId}
        />
      </div>
    </div>
  );
}

