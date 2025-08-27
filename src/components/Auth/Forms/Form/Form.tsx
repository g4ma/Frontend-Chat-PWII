import { FormStyled } from "./Form.style";

interface FormProps {
  children?: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form({ children, handleSubmit }: FormProps) {
  return (
    <FormStyled className="form" onSubmit={(e) => handleSubmit(e)}>
      {children}
    </FormStyled>
  );
}
