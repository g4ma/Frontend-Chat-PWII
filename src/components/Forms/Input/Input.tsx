interface InputProps {
  placeholder: string;
  name: string;
}

export function Input({ name, placeholder }: InputProps) {
  return <input type="text" name={name} placeholder={placeholder} />;
}
