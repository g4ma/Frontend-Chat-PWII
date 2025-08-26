import { StyledLink } from "./navigateButton.style";

type NavigateButtonProps = {
    link: string;
    text: string
}

export default function NavigateButton({ link, text }: NavigateButtonProps) {

    return (
        <StyledLink to={link}>{text}</StyledLink >
    )

}