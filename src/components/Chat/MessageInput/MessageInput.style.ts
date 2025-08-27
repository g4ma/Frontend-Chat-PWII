import styled from "styled-components";

export const InputDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 15px;
    box-sizing: border-box;
    gap: 10px;
    background: none;
    border: 1px solid #898989;
    border-radius: 8px;
`;

export const SendButton = styled.button`
    background: #898989;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    width: 40px;
    height: 40px;
    transition: all 0.2s ease;

    &:hover {
        background: #6e6e6e;
    }
`;

export const TextInput = styled.textarea`
    flex: 1;
    resize: none;
    min-height: 40px;
    max-height: 100px;
    overflow-y: auto;
    border: none;
    background: none;
    box-sizing: border-box;
    font-size: .9rem;
    color: #A3A3A3;

    &:focus {
        outline: none;
    }
`;