import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMainCarousel } from "../../plugin/axios";
import { QUERY_KEYS } from "../../plugin/reactQuerykeys";
import useInterval from "../../plugin/useInterval";
const Carousel = () => {
  interface IImgUrl {}
  const { isSuccess, data: imgData } = useQuery(
    QUERY_KEYS.MAIN_CAROUSEL,
    getMainCarousel
  );

  //TODO: imgData가 받아와졌는데 왜 is possibly 'undefined'일까?

  const [imgIndex, setImgIndex] = useState(0);
  const [style, setStyle] = useState({
    marginLeft: `-${imgIndex}00%`,
  });

  const onClickNext = () => {
    setImgIndex(imgIndex + 1);
    if (imgIndex === imgData?.length - 1) {
      setImgIndex(0);
    }
  };

  const onClickPrev = () => {
    setImgIndex(imgIndex - 1);
    if (imgIndex === 0) {
      setImgIndex(imgData?.length - 1);
    }
  };

  // auto slide
  // 5sec 가 지나면 넘어간다
  // 만약 clickEvent가 발생하면 sec는 초기화된다.
  // 5초가 지나면 index를 setImgIndex(++1)
  //index가 마지막이면 setImgIndex -1을 한다.
  const [delay, setDelay] = useState(5000);
  useEffect(() => {
    setStyle({ marginLeft: `-${imgIndex}00%` });
  }, [imgIndex]);

  // useEffect(() => {
  //   setInterval();
  // });

  const autoSlide = () => {
    setImgIndex(imgIndex + 1);
    if (imgIndex === imgData?.length - 1) {
      setImgIndex(0);
    }
  };

  useInterval(() => {
    autoSlide();
  }, [delay]);

  return (
    <CarouselComponent>
      <PrevBtn onClick={onClickPrev}> &lt;</PrevBtn>
      <CarouselWrapper>
        <FlexBox style={style}>
          {imgData &&
            imgData.map((item, index) => {
              return (
                <Image imgIndex={index} key={index} src={item.imgUrl}></Image>
              );
            })}
        </FlexBox>
      </CarouselWrapper>
      <ImgIndex>
        <p className="currentIndex">{imgIndex}</p>
        <p>/{imgData?.length - 1}</p>
      </ImgIndex>
      <NextBtn onClick={onClickNext}> &gt;</NextBtn>
    </CarouselComponent>
  );
};

export default Carousel;

interface IImgUrl {
  src: string;
  imgIndex: number;
}
const CarouselComponent = styled.div`
  width: 100%;
  padding: 30px 0 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CarouselWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
`;

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  transition: all 0.3s ease-out;
`;

const Image = styled.div<IImgUrl>`
  background: ${(props) => `url(${props.src})`};
  width: 100%;
  height: 400px;
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  flex: none;
  border-radius: 3px;
`;

const NextBtn = styled.div`
  z-index: 99;
  cursor: pointer;
  color: #d0d0d0;
  font-size: 20px;
  font-weight: 800;
  position: absolute;
  margin-left: 10px;
  right: 10px;
  background-color: #ffffffb2;
  width: 30px;
  height: 30px;
  line-height: 26px;
  text-align: center;
  border-radius: 100%;
`;
const PrevBtn = styled(NextBtn)`
  left: 0px;
`;

const ImgIndex = styled.div`
  width: 45px;
  font-size: 13px;
  position: absolute;
  top: 390px;
  right: 20px;

  border-radius: 5px;
  background-color: #ffffffb2;
  padding: 5px;
  font-weight: 800;
  display: Flex;
  align-items: center;
  justify-content: center;
  color: #323232;
  .currentIndex {
    color: #6c6b6b;
  }
`;
