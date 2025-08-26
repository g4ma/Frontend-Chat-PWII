import { useEffect, useState } from "react";
import type { User } from "../../interfaces/User";
import ProfileIcon from "../../assets/profileIcon";
import { List, NewChatButton } from "./NewChatSelector.style";
import { ContactButton, ContactUsername } from "../ContactButton/ContactButton.style";

interface NewChatSelectorProps {
  currentUserId: number;
  onSelect: (user: User) => void;
}

export default function NewChatSelector({
  currentUserId,
  onSelect,
}: NewChatSelectorProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

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
        + Nova Conversa
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
