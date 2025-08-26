import styled from "styled-components";

export const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 30px 60px;
    gap: 10px;
`;

export const MessagesArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    flex: 1;
    box-sizing: border-box;
    padding: 0 20px;
`;

export const MessageBubble = styled.div<{ isSent: boolean }>`
    align-self: ${(props) => (props.isSent ? "flex-end" : "flex-start")};
    background-color: ${(props) => (props.isSent ? "#898989" : "#cfcfcfff")};
    padding: 10px 15px;
    border-radius: ${(props) => (props.isSent ? "10px 0px 10px 10px" : "0px 10px 10px 10px")};
    max-width: 60%;
    word-wrap: break-word;
    color: #1f1f1f;
    font-size: .9rem;

`;