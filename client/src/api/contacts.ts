import { request } from "./client";
import { CONTACTS_PATH } from "./constants";
import type { Contact } from "../types/Contact";

export const contactsAPI = {
  getAll: () => request<Contact[]>(CONTACTS_PATH),

  create: (data: Partial<Contact>) =>
    request<Contact>(CONTACTS_PATH, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<Contact>) =>
    request<Contact>(`${CONTACTS_PATH}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    request<void>(`${CONTACTS_PATH}/${id}`, {
      method: "DELETE",
    }),
};
