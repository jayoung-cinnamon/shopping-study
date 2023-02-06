import React from "react";
import { IMainEventDetail, IKeys } from "../../types/mainTypes";
import styled, { css } from "styled-components";
import event_items_detail from "./EventDetail_db";
import { useRouter } from "next/router";
const EventDetail = () => {
  const router = useRouter();
  const eventId = Object.values(router.query).toString();
  const eventData = event_items_detail.filter(
    (item) => item.uniqueIndex === eventId
  );
  console.log(eventData);
  console.log(
    eventData.map((item, index) => {
      item.imgUrl;
    })
  );

  return (
    <EventDetailContainer>
      {eventData.map((item: any, index) =>
        item.uniqueIndex == eventId ? (
          <div key={index}>
            <EventInner>
              <EventInfoWrapper>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </EventInfoWrapper>
            </EventInner>
            <ImgWrapper>
              <EventImg src={item.imgUrl} />
            </ImgWrapper>
          </div>
        ) : (
          <h2 key={index}>wrong event Id </h2>
        )
      )}
    </EventDetailContainer>
  );
};

const EventDetailContainer = styled.div`
  max-width: 1200px;
  /* min-height: calc(100vh - 73px); */
  /* min-height: 100vh; */
  margin: 0px auto;
  padding: 40px 30px 100px;
  color: rgb(0, 0, 0);
`;

const EventInner = styled.div`
  width: 964px;
  margin: 0px auto;
`;

interface IProductImg {
  src: string;
}
const EventImg = styled.div<IProductImg>`
  width: 100%;
  height: 1200px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.src});
`;
const ImgWrapper = styled.div`
  /* height: 100%; */
  /* margin-bottom: 900px; */
`;
const EventInfoWrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 24px;

  h3 {
    display: inline-block;
    width: calc(100% - 200px);
    margin: 0px;
    font-size: 26px;
    font-weight: bold;
    line-height: 38px;
    letter-spacing: -0.6px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  p {
    width: 100%;
    margin-top: 4px;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.5px;
    color: rgb(155, 155, 155);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export default EventDetail;
