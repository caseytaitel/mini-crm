import type { Contact } from "../../types/Contact";
import { ContactItem } from "./ContactItem";
import styles from "./ContactList.module.css";

interface Props {
  contacts: Contact[];
  selectedContactId: number | null;
  onSelect: (id: number) => void;
  updateContact: (id: number, data: Partial<Contact>) => Promise<void>;
  deleteContact: (id: number) => Promise<void>;
  loading: boolean;
}

export function ContactList({
  contacts,
  selectedContactId,
  onSelect,
  updateContact,
  deleteContact,
  loading,
}: Props) {
  if (loading) return <div>Loading...</div>;
  if (!loading && contacts.length === 0) {
    return <div className={styles.emptyMessage}>No matching contacts.</div>;
  }

  return (
    <div className={styles.container}>
      {contacts.map((c) => (
        <ContactItem
          key={c.id}
          contact={c}
          isSelected={c.id === selectedContactId}
          onSelect={() => onSelect(c.id)}
          onUpdate={updateContact}
          onDelete={deleteContact}
        />
      ))}
    </div>
  );
}