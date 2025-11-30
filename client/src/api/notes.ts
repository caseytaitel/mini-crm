import { request } from "./client";
import { NOTES_BASE_PATH, NOTES_CONTACT_PATH } from "./constants";
import type { Note } from "../types/Note";

export const notesAPI = {
  // GET /notes/contact/:contactId
  getForContact: (contactId: number) =>
    request<Note[]>(`${NOTES_CONTACT_PATH}/${contactId}`),

  // POST /notes/contact/:contactId
  create: (contactId: number, data: Partial<Note>) =>
    request<Note>(`${NOTES_CONTACT_PATH}/${contactId}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // PUT /notes/:noteId
  update: (noteId: number, data: Partial<Note>) =>
    request<Note>(`${NOTES_BASE_PATH}/${noteId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // DELETE /notes/:noteId
  delete: (noteId: number) =>
    request<void>(`${NOTES_BASE_PATH}/${noteId}`, {
      method: "DELETE",
    }),
};
