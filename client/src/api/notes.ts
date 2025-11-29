import { request } from "./client";

export const notesAPI = {
  getForContact: (contactId: number) =>
    request(`/contacts/${contactId}/notes`),

  create: (contactId: number, data: any) =>
    request(`/notes/contact/${contactId}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (noteId: number, data: any) =>
    request(`/notes/${noteId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (noteId: number) =>
    request(`/notes/${noteId}`, {
      method: "DELETE",
    }),
};