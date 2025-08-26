import styled from "styled-components";

export const SubmitButton = styled.button`

    background: #fafafa;
    color: #1c1c1c;
    width: 350px;
    height: 35px;
    padding: 0 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: .9rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
    box-sizing: content-box;
    transition: 0.5s;

    &:hover {
        background: #353535ff;
        color: #fafafa;
        transition: 0.5s;
    }

`;