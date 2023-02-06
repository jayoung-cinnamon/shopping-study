import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaqueries";
const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <LayoutContainer>
      <Header />
      <MainContainer>{children}</MainContainer>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  min-height: 100vh;
  min-width: 1024px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mediaQueries.tablet`

  `}
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 60px);
  width: 1024px;
`;
