import { useEffect } from "react";
import { LoginForm } from "../../components/Forms/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import { MainDisplay } from "./Login.style";
import { Logo } from "../../components";

export function Login() {
  
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/chat", { replace: true });
    }
  }, [navigate]);
  
  return (
    <MainDisplay>
        <title>Login - Chatbot UI</title>
        <Logo fontSize="3rem" iconSize="75"/>
        <LoginForm />
    </MainDisplay>
  );
}