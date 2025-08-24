import { useEffect, useState } from "react";
import type { User } from "../../interfaces/User";

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
      <button onClick={() => setOpen((prev) => !prev)}>+</button>
      {open && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <button
                onClick={() => {
                  onSelect(user);
                  setOpen(false);
                }}
              >
                {user.name} ({user.username})
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
