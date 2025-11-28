import { useState } from "react";

interface Props {
  onCreate: (data: any) => void;
}

export function ContactForm({ onCreate }: Props) {
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    await onCreate({ name });
    setName("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        type="text"
        placeholder="New contact name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 8, width: "100%", marginBottom: 8 }}
      />
      <button type="submit" style={{ width: "100%", padding: 8 }}>
        Add Contact
      </button>
    </form>
  );
}