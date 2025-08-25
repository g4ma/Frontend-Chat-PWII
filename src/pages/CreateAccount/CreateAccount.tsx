import { CreateAccountForm } from "../../components/Forms/CreateAccountForm/CreateAccountForm";
import "../Home/Home.css";

export function CreateAccount() {
  return (
    <main>
      <div>
        <h2>Criar conta</h2>
        <CreateAccountForm />
      </div>
    </main>
  );
}
