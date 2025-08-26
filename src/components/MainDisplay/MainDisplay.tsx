import { MainDiv } from "./MainDisplay.style";

interface MainDisplayProps {
    children: React.ReactNode;
}

export default function MainDisplay({ children }: MainDisplayProps) {

    return (
        <MainDiv>
            {children}
        </MainDiv>
    )  ;

}