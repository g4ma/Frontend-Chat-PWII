import { useState } from "react";
import type { User } from "../../../interfaces/User";
import {
  ContactChatsContainer,
  ContactListContainer,
  NoContactsMessage,
  SearchBar,
} from "./ContactList.style";
import ProfileIcon from "../../../assets/profileIcon";
import {
  ContactButton,
  ContactText,
  ContactUsername,
} from "../ContactButton/ContactButton.style";
import { getCachedMessages } from "../../../utils/storage";

interface ContactListProps {
  currentUserId: number;
  selectContact: (contact: User) => void;
  selectedContactId: number | null;
  connected: boolean;
  contacts: User[];
}

export default function ContactList({
  connected,
  selectContact,
  selectedContactId,
  contacts,
}: ContactListProps) {
  const [search, setSearch] = useState("");

  const normalizedSearch = search.replaceAll("@", "").toLowerCase();
  const filteredContacts = contacts.filter(
    (contact) =>
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
            disabled={!connected && getCachedMessages(contact.id).length === 0}
            onClick={() => selectContact(contact)}
            $isActive={selectedContactId === contact.id}
          >
            <ProfileIcon size="25" />
            <ContactText>
              {contact.name}
              <ContactUsername>(@{contact.username})</ContactUsername>
            </ContactText>
          </ContactButton>
        ))}
        {filteredContacts.length === 0 && (
          <NoContactsMessage>Nenhuma conversa encontrada</NoContactsMessage>
        )}
      </ContactChatsContainer>
    </ContactListContainer>
  );
}
