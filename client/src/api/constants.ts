// Single source of truth for API base + paths

export const API_BASE_URL = "http://localhost:4000";

// Contacts
export const CONTACTS_PATH = "/contacts";

// Notes
// These match the working backend routes you already tested via PowerShell:
//   GET    /notes/contact/:contactId
//   POST   /notes/contact/:contactId
//   PUT    /notes/:noteId
//   DELETE /notes/:noteId
export const NOTES_BASE_PATH = "/notes";
export const NOTES_CONTACT_PATH = `${NOTES_BASE_PATH}/contact`;
