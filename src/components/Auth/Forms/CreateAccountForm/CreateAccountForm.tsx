import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Input from "../Input/Input";

export default function CreateAccountForm() {
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() ?? "";
    const username = formData.get("username")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const data = { name, username, password };

    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const user = await response.json();
      localStorage.setItem("userId", user.id.toString());

      navigate("/login");
    } catch (err) {
      console.error(err);
      window.alert("Erro ao logar usuário");
    }
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <Input name="name" placeholder="Insira seu nome" />
      <Input name="username" placeholder="Insira seu nome de usuário" />
      <Input name="password" placeholder="Insira sua senha" type="password" />
      <Button type="submit">Criar Conta</Button>
    </Form>
  );
}
