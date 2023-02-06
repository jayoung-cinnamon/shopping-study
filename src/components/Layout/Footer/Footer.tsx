import React from "react";
import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaqueries";
const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <p>이용약관</p>
        <p>개인정보 처리방침</p>
        <p>브랜드네임</p>
      </div>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  height: 40px;
  font-size: 30px;
  padding: 60px;
  width: 100%;
  padding: 10px;
  border-top: 1px solid #dadada;
  ${mediaQueries.tablet`
    font-size: 10px;
  `}
  display: flex;
  justify-content: flex-end;
  div {
    width: 300px;
    display: flex;
    justify-content: space-around;
  }
  p {
    font-size: 13px;
  }
`;
