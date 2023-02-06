import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useIsFetching } from "react-query";
import {
  deleteProductAPI,
  getFilterAPI,
  getProductAPI,
  getSingleProductAPI,
  postProductAPI,
} from "../../plugin/axios";
import { IProduct } from "../../types/productTypes";
import { QUERY_KEYS } from "../../plugin/reactQuerykeys";
import styled from "styled-components";
import { monotonicFactory } from "ulid";
import Link from "next/link";
import { mediaQueries } from "../../styles/mediaqueries";
import { IImg } from "../../types/styledTypes";
const Product = () => {
  const isFetching = useIsFetching(QUERY_KEYS.PRODUCT);
  //React-query : delete
  const {
    isError,
    isLoading,
    isSuccess,
    mutate: deleteProduct,
  } = useMutation((id: number) => deleteProductAPI(id));

  //onDelete function
  const onDeleteProduct = (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      if (isError) {
        return <div>error!</div>;
      }
      if (isLoading) {
        return <div>loading!</div>;
      }
      if (isSuccess) {
        alert("삭제되었습니다");
      }
      deleteProduct(id);
    }
  };

  // //React-query: get
  // const getProductQuery = () => {
  //   const {
  //     isLoading,
  //     isError,
  //     isSuccess,
  //     data: productData,
  //   } = useQuery(QUERY_KEYS.PRODUCT, getProductAPI);
  //   if (isLoading) {
  //     return <h2>Loading</h2>;
  //   }
  //   if (isError) {
  //     return <h2>Error</h2>;
  //   }
  //   if (isSuccess) {
  //     return productData.map((item, index) => {
  //       return (
  //         <ProductWrapper key={index}>
  //           <div>
  //             <Link
  //               href={{
  //                 pathname: `/product/${item.categoryName}`,
  //                 query: { id: `${item.id}` },
  //               }}
  //             >
  //               <a>
  //                 <div>제품이름: {item.productName}</div>
  //                 <div>제품아이디:{item.id}</div>
  //                 <div>가격:{item.price}</div>
  //                 <div>ulid:{item.ulid}</div>
  //                 <div>카테고리id:{item.categoryId}</div>
  //                 <div>카테고리name:{item.categoryName}</div>
  //               </a>
  //             </Link>
  //           </div>
  //           <button onClick={() => onDeleteProduct(item.id)}>삭제</button>
  //         </ProductWrapper>
  //       );
  //     });
  //   }
  // };

  interface IChecked {
    all: boolean;
    ring: boolean;
    bracelet: boolean;
    necklace: boolean;
    earing: boolean;
  }

  //React-query : post
  const mutation = useMutation((productData: IProduct) =>
    postProductAPI(productData)
  );

  const ulid = monotonicFactory();
  const [productData, setProductData] = useState<IProduct>({
    ulid: ulid(1000),
    id: ulid,
    productName: "",
    price: 0,
    like: 0,
    categoryId: 1,
    categoryName: "default",
    brandName: "default",
  });

  const onChangeProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let { name, value } = e.target;
    if (name == "price" || name == "categoryId") {
      value = parseInt(value);
    }
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  //onClick post
  const onClickPost = useCallback(
    async (e: any, productData: IProduct) => {
      if (productData.price === 0 || productData.productName.length === 0) {
        e.preventDefault();
        alert("모두 입력해주세요");
        return false;
      }
      await mutation.mutateAsync(productData);
    },
    [mutation]
  );

  const { data: filtering } = useQuery(QUERY_KEYS.FILTERS, {
    initialData: "",
    staleTime: Infinity,
  });

  const getFilterData = (filtering: any) => {
    const {
      isSuccess,
      isError,
      refetch,
      data: filteredData,
    } = useQuery([QUERY_KEYS.PRODUCT, filtering], () =>
      getFilterAPI(filtering)
    );
    if (isError) {
      return <h1>Error </h1>;
    }
    if (isSuccess) {
      return filteredData.map((item: any, index: any) => {
        return (
          <ProductWrapper key={index}>
            <ProductInfo>
              <Link
                href={{
                  pathname: `/product/${item.categoryName}`,
                  query: { id: `${item.id}` },
                }}
              >
                <InfoContainer>
                  <Img className="imageContainer" src={item.img} />
                  <div className="brandName">{item.brandName}</div>
                  <div className="productName">{item.productName}</div>
                  <div className="productPrice">{item.price}</div>
                </InfoContainer>
              </Link>
            </ProductInfo>
          </ProductWrapper>
        );
      });
    }
  };

  return (
    <ProductContainer>
      {getFilterData(filtering)}
      <Register></Register>
    </ProductContainer>
  );
};

export default Product;

const ProductContainer = styled.div`
  width: calc(100% - 165px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* grid-template-columns: repeat(auto-fit, minmax(186px, 1fr)); */
  /* grid-auto-rows: 100px; */
  gap: calc(100%-800px);
  flex-wrap: wrap;
  padding: 20px;
  ${mediaQueries.tablet`
        grid-template-columns: repeat(3, 1fr);
        gap: calc(100%-600px);
  `}
`;

const ProductWrapper = styled.div`
  width: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  ${mediaQueries.tablet`
   
  `}
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.div`
  .productName {
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 5px;
  }
  .productPrice {
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

const Img = styled.div<IImg>`
  background: ${(props) => `url(${props.src})`};
  width: 150px;
  height: 150px;
  background-color: #ebebeb;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;
const Register = styled.div``;
