import ChatIcon from "../../assets/chatIcon";
import { LogoContainer, Title } from "./logo.style";

type LogoProps = {
    fontSize: string;
    iconSize: string;
};

export default function Logo({ fontSize, iconSize }: LogoProps) {
    return (
        <LogoContainer>
            <ChatIcon size={iconSize} />
            <Title size={fontSize}>Chatbot UI</Title>
        </LogoContainer>
    );
}