import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup } from "./Home.style";
import { Logo, MainDisplay,  } from "../../components";
import LinkButton from "../../components/Auth/LinkButton/linkButton";

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
          <LinkButton link="/login" text="Login" />
          <LinkButton link="/signup" text="Registro" />
        </ButtonGroup>
      </MainDisplay>
  );
}
