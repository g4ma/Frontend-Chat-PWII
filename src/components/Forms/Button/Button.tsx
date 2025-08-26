import { SubmitButton } from "./Button.style"

interface ButtonProps {
    type: "button" | "submit" | "reset";
    children?: React.ReactNode;
}

export default function Button({ type, children }: ButtonProps) {

    return (
        <SubmitButton type={type}>{children}</SubmitButton>
    )

}