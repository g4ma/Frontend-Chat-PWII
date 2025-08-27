import styled from "styled-components";

type TitleProps = {
  size?: string; 
};

export const Title = styled.h1<TitleProps>`

    font-family: 'Inter', sans-serif;
    font-weight: 800;
    color: #fff;
    font-size: ${(props) => props.size || "1.5rem"};

`;

export const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`;

