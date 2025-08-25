import { useEffect } from "react";
import { LoginForm } from "../../components/Forms/LoginForm/LoginForm";
import "../Home/Home.css";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/chat", { replace: true });
    }
  }, [navigate]);
  return (
    <main>
      <div>
        <h2>Fazer Login</h2>
        <LoginForm />
      </div>
    </main>
  );
}
