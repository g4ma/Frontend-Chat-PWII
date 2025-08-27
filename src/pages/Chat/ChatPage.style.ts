import styled from "styled-components";

export const StatusTitle = styled.h3` 

    color: #FAFAFA

`;

export const ContactListWrapper = styled.div<{ $hidden?: boolean }>`
    transition: opacity 0.3s ease;
    opacity: ${(props) => (props.$hidden ? 0 : 1)};
    pointer-events: ${(props) => (props.$hidden ? "none" : "auto")};
    flex: 1;
    overflow-y: auto;
    padding: 0 15px;
`;