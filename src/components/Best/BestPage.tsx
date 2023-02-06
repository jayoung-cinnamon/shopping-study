import Link from "next/link";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getBestSellerWeek, getProductAPI } from "../../plugin/axios";
import { QUERY_KEYS } from "../../plugin/reactQuerykeys";
import { mediaQueries } from "../../styles/mediaqueries";
import { IImg } from "../../types/styledTypes";
const BestPage = () => {
  const { data: productInfo } = useQuery(QUERY_KEYS.PRODUCT, getProductAPI);

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
          <ProductInfo key={index}>
            <Link
              href={{
                pathname: `/product/${item.categoryName}`,
                query: { id: `${item.id}` },
              }}
            >
              <Img src={item.img} />
              <InfoContainer>
                <p className="brandName">{item.brandName}</p>
                <p className="productName">{item.productName}</p>
                <p className="price">{item.price}</p>
              </InfoContainer>
            </Link>
          </ProductInfo>
        );
      });
    }
  };

  return (
    <BestPageContainer>
      <Title>이주의 베스트 제품을 만나보세요! </Title>
      <BestPageWrapper>{getBestItem()}</BestPageWrapper>
    </BestPageContainer>
  );
};

export default BestPage;

const BestPageContainer = styled.div`
  width: 100%;
  /* border: 2px solid blue; */
  padding: 30px 0 30px 0;
  ${mediaQueries.tablet`
        grid-template-columns: repeat(3, 1fr);
        gap: calc(100%-600px);
  `}
`;

const BestPageWrapper = styled.div`
  /* width: calc(100% - 165px); */
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  /* display: grid; */
  /* grid-template-columns: repeat(3, 1fr); */
  /* grid-template-columns: repeat(auto-fit, minmax(186px, 1fr)); */
  grid-auto-rows: 400px;
  /* gap: 40px; */
  /* gap: calc(100% - 1000px); */
  flex-wrap: wrap;
  padding: 20px 0 20px 0;
  /* border: 1px solid green; */
`;

const ProductInfo = styled.div`
  /* border: 1px solid blue; */
  /* width: calc(100% / 4); */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.div<IImg>`
  background: ${(props) => `url(${props.src})`};
  width: 300px;
  height: 300px;
  background-color: #ebebeb;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 20px 0;
  border-radius: 3px;
`;

const InfoContainer = styled.div`
  .productName {
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 5px;
  }
  .price {
    font-size: 15px;
    font-weight: 600;
    margin-top: 10px;
    ::after {
      content: "원";
      font-size: 12px;
    }
  }
  .brandName {
    font-size: 12px;
    margin-bottom: 3px;
  }
`;

const Title = styled.div`
  width: 100%;
  /* border: 1px solid red; */
  font-size: 25px;
  font-weight: 600;
`;
