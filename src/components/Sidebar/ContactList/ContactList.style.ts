import styled from "styled-components";

export const ContactListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 300px;
`;

export const SearchBar = styled.input`
    background: none;
    border: 1px solid #262626;
    border-radius: 5px;
    color: #A3A3A3;
    width: 300px;
    height: 40px;
    padding: 0 15px;
    font-size: .85rem;
    font-weight: 400;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border: 1px solid #fff;
    }
`;

export const ContactChatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 15px;
`;

export const NoContactsMessage = styled.p`
    color: #A3A3A3;
    font-size: 1rem;
    text-align: center;
    margin: 20px 0;
`;

