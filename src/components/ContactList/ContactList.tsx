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

  useEffect(() => {
    console.log(currentUserId);
    async function getMyContact() {
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
    }
    getMyContact();
  }, [currentUserId]);

  return (
    <div>
      {contacts.map((contact) => (
        <div key={contact.id} onClick={() => selectContact(contact)}>
          {contact.name} ({contact.username})
        </div>
      ))}
    </div>
  );
}
