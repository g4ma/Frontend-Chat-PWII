import { MainDisplay, Logo } from "../../components";
import { CreateAccountForm } from "../../components/Forms/CreateAccountForm/CreateAccountForm";

export function CreateAccount() {
  return (
      <MainDisplay>
        <Logo fontSize="3rem" iconSize="75"/>
        <CreateAccountForm />
      </MainDisplay>
  );
}
