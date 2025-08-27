import styled from "styled-components";

export const ContactButton = styled.button<{ $isActive?: boolean }>`
    padding: 10px 10px;
    min-height: 40px;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    width: 300px;
    display: flex;
    background: ${({ $isActive }) => ($isActive ? "#181818ff" : "none")};
    border: none;
    box-sizing: border-box;
    border-radius: 5px;
    color: #FAFAFA;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 800;
    font-family: "Roboto", sans-serif;
    transition: all 0.2s linear;
        
    &:hover {
        opacity: 0.6;
    }
`;

export const ContactUsername = styled.span`
    color: #A3A3A3;
    font-weight: 500;
`;

export const ContactText = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    word-wrap: break-word;
    white-space: normal;
    text-align: left;
`;