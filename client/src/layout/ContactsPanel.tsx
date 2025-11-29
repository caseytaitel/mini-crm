import type { Contact } from "../types/Contact";
import { ContactForm } from "../components/contacts/ContactForm";
import { CompanyFilter } from "../components/contacts/CompanyFilter";
import { ContactList } from "../components/contacts/ContactList";
import { ContactSearch } from "../components/contacts/ContactSearch";
import { PaginationControls } from "../components/contacts/PaginationControls";

type Props = {
  contacts: Contact[];
  selectedContactId: number | null;
  onSelect: (id: number) => void;
  createContact: (data: Partial<Contact>) => Promise<void>;
  updateContact: (id: number, data: Partial<Contact>) => Promise<void>;
  deleteContact: (id: number) => Promise<void>;
  search: string;
  setSearch: (v: string) => void;
  companyFilter: string;
  setCompanyFilter: (v: string) => void;
  currentPage: number;
  setCurrentPage: (n: number) => void;
  totalPages: number;
  loading: boolean;
};

export function ContactsPanel({
  contacts,
  selectedContactId,
  onSelect,
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
  loading,
}: Props) {
  return (
    <div style={{ width: "45%", borderRight: "1px solid #eee", padding: 16 }}>
      <h2>Contacts</h2>

      {/* Search */}
      <ContactSearch search={search} setSearch={setSearch} />

      {/* Company Filter */}
      <CompanyFilter
        contacts={contacts}
        companyFilter={companyFilter}
        setCompanyFilter={setCompanyFilter}
      />

      {/* Create Contact */}
      <ContactForm onCreate={createContact} />

      {/* Contact List */}
      <ContactList
        contacts={contacts}
        selectedContactId={selectedContactId}
        onSelect={onSelect}
        updateContact={updateContact}
        deleteContact={deleteContact}
        loading={loading}
      />

      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}