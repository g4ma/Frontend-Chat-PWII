import { useEffect, useState } from "react";
import type { User } from "../../interfaces/User";

interface ContactListProps {
  currentUserId: number;
  selectContact: (contact: User) => void;
}

export default function ContactList({
  currentUserId,
  selectContact,
}: ContactListProps) {
  const [contacts, setContacts] = useState<User[]>([]);
  const [search, setSearch] = useState(""); // estado da busca

  useEffect(() => {
    async function getMyContact() {
      try {
        const response = await fetch(
          `http://localhost:3000/messages/contacts/${currentUserId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data: User[] = await response.json();
        setContacts(data);
      } catch (err) {
        console.error(err);
      }
    }
    getMyContact();
  }, [currentUserId]);
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase()) ||
    contact.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar contatos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredContacts.map((contact) => (
        <div
          key={contact.id}
          onClick={() => selectContact(contact)}
          style={{
            padding: "8px",
            borderBottom: "1px solid #444",
            cursor: "pointer",
          }}
        >
          {contact.name} ({contact.username})
        </div>
      ))}

      {filteredContacts.length === 0 && <p>Nenhum contato encontrado.</p>}
    </div>
  );
}
