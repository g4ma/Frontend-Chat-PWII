import styled from "styled-components";

export const LogoutButton = styled.button`
  position: absolute;
  bottom: 15px;
  left: 15px;
  cursor: pointer;
  padding: 10px 10px;
  min-height: 40px;
  align-items: center;
  gap: 8px;
  display: flex;
  border: none;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #262626;
  color: white;
  border: 1px solid #262626;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;
