import styled from "styled-components";

export const TextInput = styled.input` 

    background: none;
    border: 1px solid #262626;
    border-radius: 5px;
    color: #A3A3A3;
    width: 350px;
    height: 35px;
    padding: 0 10px;
    font-size: .9rem;
    font-weight: 400;

    &:focus {
        outline: none;
        border: 1px solid #fff;
    }

`;