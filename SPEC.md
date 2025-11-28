// Mini CRM — System Specification //
// Project Overview //

The Mini CRM is a two-entity, full-stack application for managing contacts and their associated notes. It includes:
    React (TypeScript) frontend using custom hooks
    Express backend with clean route/controller/service structure
    Prisma + SQLite database with a one-to-many relationship
    CRUD operations for both entities
    Multi-panel UI (Contacts panel + Notes panel)
    Clean, production-style architecture 

The purpose of this project is to practice multi-entity system design, relationship modeling, UI synchronization, and scalable front-end logic through hooks and API abstraction.

// Entities & Relationships //

Contact (Parent Entity)
    Fields:
        id — Int, autoincrement, primary key
        name — String
        email — String? (optional)
        phone — String? (optional)
        company — String? (optional)
        createdAt — DateTime @default(now())
    Relationship:
        One Contact → Many Notes
        Exposed via notes in Prisma

Note (Child Entity)
    Fields:
        id — Int, autoincrement, primary key
        contactId — Int (foreign key → Contact.id)
        title — String? (optional)
        body — String
        createdAt — DateTime @default(now())
    Relationship:
        Each Note belongs to exactly one Contact
    Defined via Prisma relation:
        contact   Contact @relation(fields: [contactId], references: [id])

// API Surface //

The API uses a clean REST structure with two entities: Contacts and Notes.
Notes are created under a contact but updated/deleted through flat routes.

Contacts
GET /contacts
    Return the full list of contacts.
    Default sorting: newest first (createdAt desc).
POST /contacts
    Create a new contact.
    Body:
        {
        "name": "string",
        "email": "string?",
        "phone": "string?",
        "company": "string?"
        }
PUT /contacts/:id
    Update an existing contact.
    Body:
        {
        "name": "string",
        "email": "string?",
        "phone": "string?",
        "company": "string?"
        }
DELETE /contacts/:id
    Delete a contact and all associated notes (cascade or manual cleanup 
    determined in implementation).

Notes
GET /contacts/:contactId/notes
    Return all notes for a given contact.
POST /contacts/:contactId/notes
    Create a new note for that contact.
    Body:
        {
        "title": "string?",
        "body": "string"
        }
PUT /notes/:noteId
    Update an existing note.
    Body:
        {
        "title": "string?",
        "body": "string"
        }
DELETE /notes/:noteId
    Delete a note.

// Frontend Structure //

The frontend is a React (TypeScript) application organized around two major UI regions:
    Contacts Panel (left)
    Notes Panel (right)

It follows a modular, scalable structure.

Component Tree
    src/
    components/
        Contacts/
            ContactList.tsx
            ContactItem.tsx
            ContactForm.tsx
        Notes/
            NoteList.tsx
            NoteItem.tsx
            NoteForm.tsx
    hooks/
        useContacts.ts
        useNotes.ts
    api/
        client.ts
        contacts.ts
        notes.ts
    pages/
        App.tsx

Hook Responsibilities = 
    Perform CRUD operations
    Call the API
    Update state
    Return updated lists to components

useContacts()
    Manages all contact-level logic:
        contacts state
        loading + error
        fetchContacts
        createContact
        updateContact
        deleteContact

useNotes(contactId)
    Manages all note-level logic:
        notes state
        loading + error
        fetchNotes(contactId)
        createNote
        updateNote
        deleteNote

UI Responsibilities
    Contacts UI:
        display contact list
        select a contact
        present forms for create/edit
        call hook handlers:
            handleCreateContact()
            handleUpdateContact()         
            handleDeleteContact()
    
    Notes UI:
        display notes for selected contact
        present forms for create/edit
        call hook handlers:
            handleCreateNote()
            handleUpdateNote()
            handleDeleteNote()

UI components do not perform data fetching or CRUD; they only render and handle interactions.

// Data Flow Summary //

The Mini CRM uses a predictable data flow architecture:
Pages (App) --> Components (UI) → Hooks → API → Backend → Database → Back to UI.

1. Initial Load
App.tsx renders.
useContacts() runs:
    fetches all contacts via GET /contacts.
    stores them in contacts state.

2. Selecting a Contact
User clicks a ContactItem.
selectedContactId is set in App.tsx.
useNotes(selectedContactId) runs:
    calls GET /contacts/:id/notes.
    stores notes in the notes state.
Notes panel updates automatically based on the selected contact.

3. Creating or Editing a Contact
UI calls the appropriate handler:
    createContact() or
    updateContact()
Handler calls API:
    POST /contacts or
    PUT /contacts/:id
Backend writes to database.
useContacts() refreshes the contacts list.
UI updates immediately.

4. Creating or Editing a Note
If user is viewing a contact’s notes:
    createNote(contactId) or
    updateNote(noteId)
API calls:
    POST /contacts/:contactId/notes or
    PUT /notes/:noteId
Backend writes to database.
useNotes(selectedContactId) refreshes notes for that contact.
UI updates seamlessly.

5. Deleting a Contact
UI triggers deleteContact(id).
API calls DELETE /contacts/:id.
Backend either:
    cascades note deletion, or
    deletes notes manually.
useContacts() refreshes contacts.
selectedContactId resets to null.
Notes panel clears.

6. Deleting a Note
UI triggers deleteNote(noteId).
API calls DELETE /notes/:noteId.
useNotes(selectedContactId) refreshes notes array.

7. Component Responsibility Summary
UI components: render + trigger handlers
Hooks: hold all state + logic
API files: talk to backend
Backend: validates, processes, queries DB
Prisma: enforces relationships and types
This structure keeps your frontend clean, predictable, and scalable.