import React from "react";
import type { Contact } from "../types/Contact";

type Props = {
  contacts: Contact[];
  selectedContactId: number | null;
  onSelect: (id: number) => void;
  search: string;
  setSearch: (v: string) => void;
  companyFilter: string;
  setCompanyFilter: (v: string) => void;
  currentPage: number;
  setCurrentPage: (n: number) => void;
  totalPages: number;
};

export function ContactsPanel({
  contacts,
  selectedContactId,
  onSelect,
  search,
  setSearch,
  companyFilter,
  setCompanyFilter,
  currentPage,
  setCurrentPage,
  totalPages,
}: Props) {
  return (
    <div style={{ width: "45%", borderRight: "1px solid #eee", padding: "16px" }}>
      <h2>Contacts</h2>

      {/* Search */}
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />

      {/* Company Filter */}
      <input
        placeholder="Filter by company..."
        value={companyFilter}
        onChange={(e) => setCompanyFilter(e.target.value)}
        style={{ width: "100%", marginBottom: 16 }}
      />

      {/* List */}
      <div>
        {contacts.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelect(c.id)}
            style={{
              padding: "8px",
              cursor: "pointer",
              background: c.id === selectedContactId ? "#f3f3f3" : "white",
              borderBottom: "1px solid #eee",
            }}
          >
            <strong>{c.name}</strong>
            {c.company && <div style={{ fontSize: 12 }}>{c.company}</div>}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
