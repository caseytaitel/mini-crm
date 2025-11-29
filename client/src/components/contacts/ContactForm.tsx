import { useState } from "react";

interface Props {
  onCreate: (data: any) => void;
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
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        style={{ padding: 8, width: "100%", marginBottom: 8 }}
        type="text"
        placeholder="Name (required)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        style={{ padding: 8, width: "100%", marginBottom: 8 }}
        type="email"
        placeholder="Email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={{ padding: 8, width: "100%", marginBottom: 8 }}
        type="text"
        placeholder="Phone (optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        style={{ padding: 8, width: "100%", marginBottom: 8 }}
        type="text"
        placeholder="Company (optional)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button type="submit" style={{ width: "100%", padding: 8 }}>
        Add Contact
      </button>
    </form>
  );
}