import { useEffect, useState } from "react";
import { List, NewChatButton } from "./NewChatSelector.style";
import type { User } from "../../../interfaces/User";

import { ContactButton, ContactUsername } from "../ContactButton/ContactButton.style";
import ProfileIcon from "../../../assets/profileIcon";

interface NewChatSelectorProps {
  currentUserId: number;
  onSelect: (user: User) => void;
  onToggleOpen: (open: boolean) => void;
}

export default function NewChatSelector({
  currentUserId,
  onSelect,
  onToggleOpen,
}: NewChatSelectorProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

  // Avisa o componente pai quando o estado 'open' mudar
  useEffect(() => {
    onToggleOpen(open);
  }, [open, onToggleOpen]);


  // Busca usuários quando o seletor é aberto
  useEffect(() => {
    if (!open) return;

    async function fetchUsers() {
      try {
        const response = await fetch(
          `http://localhost:3000/users/newchat/${currentUserId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) throw new Error("Erro ao buscar usuários");
        const allUsers: User[] = await response.json();

        setUsers(allUsers);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUsers();
  }, [open, currentUserId]);

  return (
    <div>
      <NewChatButton onClick={() => setOpen((prev) => !prev)}>
        {open ? "Voltar" : "+ Nova Conversa"}
      </NewChatButton>

      <List className={open ? "open" : ""}>
        {users.map((user) => (
          <li key={user.id}>
            <ContactButton
              onClick={() => {
                onSelect(user);
                setOpen(false);
              }}
            >
              <ProfileIcon size="25" />
              {user.name} <ContactUsername>(@{user.username})</ContactUsername>
            </ContactButton>
          </li>
        ))}
      </List>
    </div>
  );
}
