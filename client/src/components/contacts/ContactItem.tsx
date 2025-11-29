import { useState } from "react";
import type { Contact } from "../../types/Contact";

interface Props {
  contact: Contact;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (id: number, data: Partial<Contact>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function ContactItem({
  contact,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email || "");
  const [phone, setPhone] = useState(contact.phone || "");
  const [company, setCompany] = useState(contact.company || "");

  async function handleSave() {
    await onUpdate(contact.id, { name, email, phone, company });
    setIsEditing(false);
  }

  function handleCancel() {
    setName(contact.name);
    setEmail(contact.email || "");
    setPhone(contact.phone || "");
    setCompany(contact.company || "");
    setIsEditing(false);
  }

  return (
    <div
      style={{
        padding: "8px 12px",
        background: isSelected ? "#e6f0ff" : "white",
        borderBottom: "1px solid #eee",
      }}
    >
      {isEditing ? (
        <>
          <input
            style={{ width: "100%", marginBottom: 4 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={{ width: "100%", marginBottom: 4 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{ width: "100%", marginBottom: 4 }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            style={{ width: "100%", marginBottom: 4 }}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <button onClick={handleSave} style={{ marginRight: 8 }}>
            Save
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <div onClick={onSelect} style={{ cursor: "pointer" }}>
          <strong>{contact.name}</strong>
          {contact.company && (
            <div style={{ fontSize: 12 }}>{contact.company}</div>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(contact.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}