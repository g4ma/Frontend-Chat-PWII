import { useEffect } from "react";
import { LoginForm } from "../../components/Forms/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";

export function Login() {
  
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/chat", { replace: true });
    }
  }, [navigate]);

  console.log("Renderizando Login");
  
  return (
    <main>
      <div>
        <h2>Fazer Login</h2>
        <LoginForm />
      </div>
    </main>
  );
}