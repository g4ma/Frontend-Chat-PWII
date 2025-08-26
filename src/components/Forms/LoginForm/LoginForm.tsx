import { useNavigate } from "react-router-dom";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import Button from "../Button/Button";

export function LoginForm() {
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const data = { username, password };

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const user = await response.json();
      localStorage.setItem("userId", user.id.toString());

      navigate("/chat");
    } catch (err) {
      console.error(err);
      window.alert("Erro ao logar usuário");
    }
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <Input name="username" placeholder="Insira seu nome de usuário" />
      <Input name="password" placeholder="Insira sua senha" type="password" />
      <Button type="submit">Entrar</Button>
    </Form>
  );
}
