import React from "react";
import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaqueries";

const Header = () => {
  return <HeaderContainer>Header!!</HeaderContainer>;
};

export default Header;

const HeaderContainer = styled.header`
  width: 100%;
  font-size: 40px;
  height: 60px;
  border: 1px solid green;
  ${mediaQueries.mobile`
    font-size: 30px;
  `}
`;
