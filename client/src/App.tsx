import { useState } from "react";
import { useContacts } from "./hooks/useContacts";
import { useNotes } from "./hooks/useNotes";
import { ContactsPanel } from "./layout/ContactsPanel";
import { NotesPanel } from "./layout/NotesPanel";
import styles from "./App.module.css";

export default function App() {
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);

  const {
    contacts,
    loading: contactsLoading,
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
    sortOrder,
    setSortOrder
  } = useContacts();  

  const {
    notes,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes(selectedContactId);

  return (
    <div className={styles.container}>
      <ContactsPanel
        contacts={contacts}
        selectedContactId={selectedContactId}
        onSelect={setSelectedContactId}
        createContact={createContact}
        updateContact={updateContact}
        deleteContact={deleteContact}
        search={search}
        setSearch={setSearch}
        companyFilter={companyFilter}
        setCompanyFilter={setCompanyFilter}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        loading={contactsLoading}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder} 
      />
  
      <NotesPanel
        notes={notes}
        selectedContactId={selectedContactId}
        createNote={createNote}
        updateNote={updateNote}
        deleteNote={deleteNote}
      />
    </div>
  );
}  