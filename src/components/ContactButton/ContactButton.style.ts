import styled from "styled-components";

export const ContactButton = styled.button`
    padding: 10px 10px;
    height: 30px;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    width: 100%;
    display: flex;
    background: none;
    border: none;
    color: #FAFAFA;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 800;
    font-family: "Roboto", sans-serif;
    transition: all 0.2s linear;
        
    &:hover {
        opacity: 0.8;
    }
`;

export const ContactUsername = styled.span`
    color: #A3A3A3;
    font-weight: 500;
`;