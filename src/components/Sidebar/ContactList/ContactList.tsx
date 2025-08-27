import { useEffect, useState } from "react";
import type { User } from "../../../interfaces/User";
import { ContactChatsContainer, ContactListContainer, NoContactsMessage, SearchBar } from "./ContactList.style";
import ProfileIcon from "../../../assets/profileIcon";
import { ContactButton, ContactUsername } from "../ContactButton/ContactButton.style";

interface ContactListProps {
  currentUserId: number;
  selectContact: (contact: User) => void;
}

export default function ContactList({
  currentUserId,
  selectContact,
}: ContactListProps) {

  const [contacts, setContacts] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  // Busca os contatos do usuário ao montar o componente
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

  // Filtra os contatos com base na busca
  const normalizedSearch = search.replaceAll("@", "").toLowerCase();
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedSearch) ||
    contact.username.toLowerCase().includes(normalizedSearch)
  );

  return (
    <ContactListContainer>
      <SearchBar
        type="text"
        placeholder="Buscar conversas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ContactChatsContainer>
        {filteredContacts.map((contact) => (
          <ContactButton
            key={contact.id}
            onClick={() => selectContact(contact)}
          >
            <ProfileIcon size="25" />
            {contact.name} <ContactUsername>(@{contact.username})</ContactUsername>
          </ContactButton>
        ))}
        {filteredContacts.length === 0 && <NoContactsMessage>Nenhuma conversa encontrada</NoContactsMessage>}
      </ContactChatsContainer>
    </ContactListContainer>
  );
}
