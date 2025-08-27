import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(NavLink)`

    background: #fafafa;
    color: #1c1c1c;
    width: 300px;
    height: 40px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-weight: 700;
    transition: 0.5s;

    &:hover {
        background: #353535ff;
        color: #fafafa;
        transition: 0.5s;
    }

`;