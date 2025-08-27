import { useEffect, useState } from "react";
import type { User } from "../../interfaces/User";
import { getContacts, saveContacts } from "../../utils/storage";

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
    async function getMyContact() {
      try {
        const response = await fetch(
          `http://localhost:3000/messages/contacts/${currentUserId}`
        );

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data: User[] = await response.json();
        setContacts(data);

        saveContacts(currentUserId, data);
      } catch {
        console.warn(
          "Sem conexão com o servidor, carregando contatos offline..."
        );
        const storedContacts = getContacts(currentUserId);
        if (storedContacts.length > 0) {
          setContacts(storedContacts);
        }
      }
    }

    getMyContact();
  }, [currentUserId]);

  return (
    <div>
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <div key={contact.id} onClick={() => selectContact(contact)}>
            {contact.name} ({contact.username})
          </div>
        ))
      ) : (
        <p>Nenhum contato encontrado.</p>
      )}
    </div>
  );
}
