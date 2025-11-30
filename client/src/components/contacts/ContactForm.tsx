import { useState } from "react";
import type { Contact } from "../../types/Contact";
import styles from "./ContactForm.module.css";

interface Props {
  onCreate: (data: Partial<Contact>) => Promise<void>;
}

export function ContactForm({ onCreate }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    await onCreate({ name, email, phone, company });

    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        placeholder="Name (required)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className={styles.input}
        placeholder="Email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className={styles.input}
        placeholder="Phone (optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        className={styles.input}
        placeholder="Company (optional)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button type="submit" className={styles.submitButton}>
        Add Contact
      </button>
    </form>
  );
}