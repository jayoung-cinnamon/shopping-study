import Link from "next/link";
import React from "react";
import styled from "styled-components";
import eventItems from "./EventMain_db";
const EventComponent = () => {
  return (
    <>
      {eventItems.map((item, index) => (
        <EventContainer key={index}>
          <Link href={`/event/${item.id}`}>
            <EventWrapper>
              <EventTitle>
                <strong>{item.title}</strong>
                <p>{item.subTitle}</p>
              </EventTitle>
              <EventImg src={item.imgUrl} />
            </EventWrapper>
          </Link>
        </EventContainer>
      ))}
    </>
  );
};

const EventContainer = styled.div`
  div:nth-child(1) {
    padding-top: 50px;
  }
  article:nth-child(1) {
    margin-bottom: 50px;
  }
`;
const EventWrapper = styled.article``;
const EventTitle = styled.div`
  margin-bottom: 24px;
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  line-height: 38px;
  letter-spacing: -0.6px;
  p {
    margin-top: 4px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.5px;
    color: rgb(155, 155, 155);
  }
`;

const EventImg = styled.img`
  width: 100%;
  cursor: pointer;
  border-radius: 3px;
`;

export default EventComponent;
