import { request } from "./client";

export const notesAPI = {
  getForContact: (contactId: number) => request(`/notes/contact/${contactId}`),
  create: (contactId: number, data: any) =>
    request(`/notes/contact/${contactId}`, { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: any) =>
    request(`/notes/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => request(`/notes/${id}`, { method: "DELETE" }),
};
