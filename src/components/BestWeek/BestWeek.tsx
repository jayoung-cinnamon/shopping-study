import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getBestSellerWeek, getProductAPI } from "../../plugin/axios";
import { QUERY_KEYS } from "../../plugin/reactQuerykeys";
import { IImg } from "../../types/styledTypes";
const BestWeek = () => {
  const { data: productInfo } = useQuery(QUERY_KEYS.PRODUCT, getProductAPI);
  const [sliceIndex, setSliceIndex] = useState(0);
  const [style, setStyle] = useState({
    marginLeft: `-${sliceIndex}00%`,
  });

  useEffect(() => {
    setStyle({ marginLeft: `calc(-${sliceIndex}00%)` });
  }, [sliceIndex]);
  const {
    isLoading,
    isError,
    isSuccess,
    data: bestIds,
  } = useQuery(QUERY_KEYS.BEST_SELLER_WEEK, getBestSellerWeek);

  const getBestItem = () => {
    if (isSuccess && productInfo) {
      const result = productInfo.filter(({ ulid: value }) =>
        bestIds.some(({ ulid: value2 }) => value === value2)
      );

      return result.map((item, index) => {
        return (
          <BestItem key={index}>
            <Link
              href={{
                pathname: `/product/${item.categoryName}`,
                query: { id: `${item.id}` },
              }}
            >
              <Img src={item.img} />
              <Info>
                <p className="brandName">{item.brandName}</p>
                <p className="productName">{item.productName}</p>
                <p className="price">{item.price}</p>
              </Info>
            </Link>
          </BestItem>
        );
      });
    }
  };

  useEffect(() => {
    console.log(sliceIndex, style);
  }, [style]);

  const onClickNext = () => {
    setSliceIndex(sliceIndex + 1);
    if (sliceIndex === bestIds?.length / 3 - 1) {
      setSliceIndex(0);
    }
  };

  const onClickPrev = () => {
    setSliceIndex(sliceIndex - 1);
    if (sliceIndex === 0) {
      setSliceIndex(bestIds?.length / 3 - 1);
    }
  };

  return (
    <BestWeekContainer>
      <BestWeekTitle>Weekly Best Item!</BestWeekTitle>
      <ItemWrapper>
        <PrevBtn onClick={onClickPrev}> &lt;</PrevBtn>
        <BestWrapper style={style}>{getBestItem()}</BestWrapper>
      </ItemWrapper>
      <NextBtn onClick={onClickNext}>&gt;</NextBtn>
      <Link href="/best">
        <MoreViewBtn>View More </MoreViewBtn>
      </Link>
    </BestWeekContainer>
  );
};

export default BestWeek;

const BestWeekContainer = styled.div`
  width: 100%;
  /* height: 450px; */
  /* border: 1px solid red; */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BestWeekTitle = styled.div`
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

const ItemWrapper = styled.div`
  width: 1024px;
  overflow: hidden;

  /* border: 1px solid yellow; */
`;

const BestWrapper = styled.div`
  /* overflow: hidden; */
  display: flex;
  transition: all 0.3s ease-out;
  /* display: grid;
  grid-template-columns: repeat(3, 1fr); */
`;
const BestItem = styled.div`
  /* width: 300px; */
  width: 334px;
  /* border: 2px solid green; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 20px;
  flex: none;
  margin-right: 10px;
  z-index: 99;
  /* margin: 10px; */
`;

const NextBtn = styled.button`
  position: absolute;
  top: 200px;
  right: 10px;
  background-color: #ffffffb2;
  width: 30px;
  height: 30px;
  line-height: 26px;
  text-align: center;
  border-radius: 100%;
  border: none;
  cursor: pointer;
  z-index: 999;
`;

const PrevBtn = styled(NextBtn)`
  left: 10px;
`;

const Img = styled.div<IImg>`
  background: ${(props) => `url(${props.src})`};
  width: 300px;
  height: 300px;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 3px;
`;

const Info = styled.div`
  /* width: 100%; */
  /* height: 400px; */
  z-index: 100;
  .brandName {
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 3px;
    margin-top: 10px;
  }
  .productName {
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: 600;
  }
  .price {
    font-size: 15px;
    font-weight: 700;
  }
  .price::after {
    content: "원";
    font-weight: 400;
  }
`;

const MoreViewBtn = styled.button`
  margin-top: 30px;
  width: 345px;
  height: 44px;
  background-color: none;
  border: none;
  box-shadow: none;
  cursor: pointer;
  :hover {
    background-color: grey;
    transition: all 0.3s ease-out;
  }
`;
