import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, MainDisplay } from "./Home.style";
import { Logo, NavigateButton } from "../../components";

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/chat", { replace: true });
    }
  }, [navigate]);

  return (
      <MainDisplay>
        <title>Chatbot UI</title>
        <Logo fontSize="3rem" iconSize="75"/>
        <ButtonGroup>
          <NavigateButton link="/login" text="Login" />
          <NavigateButton link="/signup" text="Registro" />
        </ButtonGroup>
      </MainDisplay>
  );
}
