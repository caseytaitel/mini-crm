import { useEffect, useState } from "react";
import { contactsAPI } from "../api/contacts";
import type { Contact } from "../types/Contact";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; 
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setCurrentPage(1);
  }, [search, companyFilter]);
  
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

  // --- TRANSFORM PIPELINE ---

  // 1. SEARCH
  const searched = contacts.filter((c) => {
    const query = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.email?.toLowerCase().includes(query) ||
      c.company?.toLowerCase().includes(query)
    );
  });

  // 2. FILTER by company
  const filtered =
    companyFilter === ""
      ? searched
      : searched.filter((c) => c.company === companyFilter);
  
  // 3. SORT
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "asc") return a.name.localeCompare(b.name);
    return b.name.localeCompare(a.name);
  });

  // 4. PAGINATION
  const totalPages = Math.ceil(sorted.length / pageSize);

  const start = (currentPage - 1) * pageSize;
  const paginated = sorted.slice(start, start + pageSize);
  
  return {
    contacts: paginated,
    loading,
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
    sortOrder,
    setSortOrder,
  };
}
