import React from "react";
import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaqueries";
const Footer = () => {
  return <FooterContainer>Footer!!</FooterContainer>;
};

export default Footer;

const FooterContainer = styled.footer`
  height: 40px;
  border: 1px solid green;
  font-size: 40px;
  ${mediaQueries.mobile`
  font-size: 20px
  `}
`;
