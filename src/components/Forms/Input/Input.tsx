import { TextInput } from "./Input.style";

interface InputProps {
  placeholder: string;
  name: string;
  type?: string;
}

export function Input({ name, placeholder, type }: InputProps) {
  return <TextInput type={type || "text"} name={name} placeholder={placeholder} />;
}
