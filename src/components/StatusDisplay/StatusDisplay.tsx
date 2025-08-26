import { StatusDisplayContainer } from "./StatusDisplay.style";

interface StatusDisplayProps {
    children: React.ReactNode;
}

export default function StatusDisplay({ children }: StatusDisplayProps) {
    return (
        <StatusDisplayContainer>
            {children}
        </StatusDisplayContainer>
    );
}