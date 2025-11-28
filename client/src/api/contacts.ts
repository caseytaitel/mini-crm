import { request } from "./client";

export const contactsAPI = {
  getAll: () => request("/contacts"),
  create: (data: any) => request("/contacts", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: any) =>
    request(`/contacts/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => request(`/contacts/${id}`, { method: "DELETE" }),
};
