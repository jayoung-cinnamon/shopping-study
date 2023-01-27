import React from "react";
import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaqueries";
const Main = () => {
  return <MainContainer>Main!!</MainContainer>;
};

export default Main;

const MainContainer = styled.div`
  border: 1px solid blue;

  font-size: 40px;
  ${mediaQueries.mobile`
    border:1px solid blue;
    font-size: 20px;
  `}
`;
