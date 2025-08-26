import styled from "styled-components";

export const NewChatButton = styled.button` 

    backkground: #FAFAFA;
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
    margin-bottom: 10px;

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
  transition: max-height 0.5s linear , opacity 0.2s ease;

  &.open {
    max-height: 300px; /* ajusta conforme o tamanho máximo que você quer */
    opacity: 1;
  }

  li {
    margin: 10px 0;

    button {
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
    }
  }
`;
