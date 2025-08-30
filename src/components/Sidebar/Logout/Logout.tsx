import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../../assets/logoutIcon";
import { LogoutButton } from "./Logout.style";

export default function Logout() {
  const navigate = useNavigate();

  // Pra quando for fazer logout
  async function unsubscribeToPushNotification(receiverId: number) {
    const subscriptionLS = localStorage.getItem("subscription");
    if (subscriptionLS) {
      const subscription = JSON.parse(subscriptionLS);
      await fetch("http://localhost:3000/notification/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription,
          receiverId,
        }),
      });
    }
  }

  async function logoutUser() {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const receiverId = parseInt(userId);
      await unsubscribeToPushNotification(receiverId);

      localStorage.clear();
      navigate("/");
    }
  }

  return (
    <LogoutButton onClick={logoutUser}>
      <LogoutIcon color="white" size="24" width="24" />
      Sair
    </LogoutButton>
  );
}
