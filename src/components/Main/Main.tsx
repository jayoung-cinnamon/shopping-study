import React from "react";
import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaqueries";
import BestWeek from "../BestWeek/BestWeek";
import Carousel from "../Carousel/Carousel";
import EventComponent from "../Event/EventComponent";
const Main = () => {
  return (
    <MainContainer>
      <Carousel />
      <BestWeek />
      <EventComponent />
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  width: 100%;
  font-size: 40px;
  ${mediaQueries.tablet`
    font-size: 30px;
  `}
`;
