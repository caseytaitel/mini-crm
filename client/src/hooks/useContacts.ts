import { useEffect, useState } from "react";
import { contactsAPI } from "../api/contacts";
import type { Contact } from "../types/Contact";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all contacts on mount
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await contactsAPI.getAll();
        setContacts(data);
      } catch (err) {
        setError("Failed to load contacts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // CREATE
  async function createContact(data: Partial<Contact>) {
    const newContact = await contactsAPI.create(data);
    setContacts((prev) => [newContact, ...prev]);
  }

  // UPDATE
  async function updateContact(id: number, data: Partial<Contact>) {
    const updated = await contactsAPI.update(id, data);
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? updated : c))
    );
  }

  // DELETE
  async function deleteContact(id: number) {
    await contactsAPI.delete(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }

  return {
    contacts,
    loading,
    error,
    createContact,
    updateContact,
    deleteContact,
  };
}
