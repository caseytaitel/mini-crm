import { useState } from "react";
import { useContacts } from "./hooks/useContacts";
import { useNotes } from "./hooks/useNotes";
import { ContactsPanel } from "./layout/ContactsPanel";
import { NotesPanel } from "./layout/NotesPanel"

export default function App() {
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);

  const {
    contacts,
    loading: contactsLoading,
    error,
    createContact,
    updateContact,
    deleteContact,
    search,
    setSearch,
    companyFilter,
    setCompanyFilter,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useContacts();  

  const {
    notes,
    loading: notesLoading,
    createNote,
  } = useNotes(selectedContactId);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ContactsPanel
        contacts={contacts}
        selectedContactId={selectedContactId}
        onSelect={setSelectedContactId}
        search={search}
        setSearch={setSearch}
        companyFilter={companyFilter}
        setCompanyFilter={setCompanyFilter}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
  
      <NotesPanel
        notes={notes}
        selectedContactId={selectedContactId}
        createNote={createNote}
        loading={notesLoading}
      />
    </div>
  );
}  