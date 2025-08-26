import styled from "styled-components";

export const NewChatButton = styled.button` 

    background: #FAFAFA;
    width: 300px;
    height: 40px;
    border-radius: 8px;
    border: none;
    padding: 0 10px;
    cursor: pointer;
    color: #0A0A0A;
    font-weight: 500;
    font-family: "Roboto", sans-serif;
    font-size: .9rem;
    transition: 0.3s;

    &:hover {
        background: #A3A3A3;
        transition: 0.3s;
    }

`;

export const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.5s linear , opacity 0.2s linear;   
    
    &.open {
        max-height: 300px;
        opacity: 1;
    }   
    li {
      margin: 15px 0;
    }
`;