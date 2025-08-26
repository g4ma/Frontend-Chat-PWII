import { MainDiv } from "./ChatDisplay.style";

interface ChatDisplayProps {
    children: React.ReactNode;
}

export default function ChatDisplay({ children }: ChatDisplayProps) {

    return (
        <MainDiv>
            {children}
        </MainDiv>
    )  ;

}