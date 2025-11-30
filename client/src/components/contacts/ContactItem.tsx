import { useState } from "react";
import type { Contact } from "../../types/Contact";
import styles from "./ContactItem.module.css";

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
      className={isSelected ? styles.containerSelected : styles.container}
    >
      {isEditing ? (
        <>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className={styles.input}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
          <button onClick={handleCancel} className={styles.button}>
            Cancel
          </button>
        </>
      ) : (
        <div onClick={onSelect} className={styles.clickable}>
          <strong>{contact.name}</strong>
          {contact.company && (
            <div className={styles.company}>{contact.company}</div>
          )}
          <div className={styles.buttonContainer}>
            <button onClick={() => setIsEditing(true)} className={styles.button}>
              Edit
            </button>
            <button onClick={() => onDelete(contact.id)} className={styles.button}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}