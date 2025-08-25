import "../Form/Form.css";

interface FormProps {
  children?: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function Form({ children, handleSubmit }: FormProps) {
  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      {children} <input type="submit" name="Enviar" />
    </form>
  );
}
