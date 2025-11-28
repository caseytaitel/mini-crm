import type { Contact } from "../../types/Contact";

interface Props {
  contact: Contact;
  isSelected: boolean;
  onSelect: () => void;
}

export function ContactItem({ contact, isSelected, onSelect }: Props) {
  return (
    <div
      onClick={onSelect}
      style={{
        padding: "8px 12px",
        cursor: "pointer",
        background: isSelected ? "#e6f0ff" : "white",
        borderBottom: "1px solid #eee",
      }}
    >
      <strong>{contact.name}</strong>
      {contact.company && <div style={{ fontSize: 12 }}>{contact.company}</div>}
    </div>
  );
}