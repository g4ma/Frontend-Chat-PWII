import { StyledLink } from "./linkButton.style";

type LinkButtonProps = {
    link: string;
    text: string
}

export default function LinkButton({ link, text }: LinkButtonProps) {

    return (
        <StyledLink to={link}>{text}</StyledLink >
    )

}