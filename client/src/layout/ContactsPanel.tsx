import type { Contact } from "../types/Contact";
import { ContactForm } from "../components/contacts/ContactForm";
import { CompanyFilter } from "../components/contacts/CompanyFilter";
import { ContactList } from "../components/contacts/ContactList";
import { ContactSearch } from "../components/contacts/ContactSearch";
import { PaginationControls } from "../components/contacts/PaginationControls";
import { SortControls } from "../components/contacts/SortControls";
import styles from "./ContactsPanel.module.css";

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
  sortOrder: "asc" | "desc";
  setSortOrder: (v: "asc" | "desc") => void;
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
  sortOrder,
  setSortOrder,   
}: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        Contacts
      </h2>

      <div className={styles.content}>
      {/* Search */}
      <ContactSearch search={search} setSearch={setSearch} />

      {/* Company Filter */}
      <CompanyFilter
        contacts={contacts}
        companyFilter={companyFilter}
        setCompanyFilter={setCompanyFilter}
      />

      {/* Sort */}
      <SortControls sortOrder={sortOrder} setSortOrder={setSortOrder} />

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
    </div>
  );
}