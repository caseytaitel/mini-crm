import type { Contact } from "../../types/Contact";
import { ContactItem } from "./ContactItem";

interface Props {
  contacts: Contact[];
  selectedContactId: number | null;
  onSelect: (id: number) => void;
  loading: boolean;
}

export function ContactList({ contacts, selectedContactId, onSelect, loading }: Props) {
  if (loading) return <div>Loading...</div>;
  if (!contacts.length) return <div>No contacts yet</div>;

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 4 }}>
      {contacts.map((c) => (
        <ContactItem
          key={c.id}
          contact={c}
          isSelected={c.id === selectedContactId}
          onSelect={() => onSelect(c.id)}
        />
      ))}
    </div>
  );
}