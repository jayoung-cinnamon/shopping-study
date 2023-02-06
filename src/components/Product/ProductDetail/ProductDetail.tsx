import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "../../../plugin/reactQuerykeys";
import {
  deleteProductAPI,
  getSingleProductAPI,
  updateProductAPI,
} from "../../../plugin/axios";
import { IProduct } from "../../../types/productTypes";
import { IImg } from "../../../types/styledTypes";
const ProductDetail = () => {
  const router = useRouter();
  interface IProductId {
    productId: number;
    setProductId: React.Dispatch<React.SetStateAction<[number]>>;
  }
  // id별로 get query
  // const { data: dataById, refetch } = useQuery(
  //   QUERY_KEYS.PRODUCT,
  //   (productId) => getSingleProductAPI(productId)
  // );
  // const initialId = Number(router.query.id);
  // const [productId, setProductId] = useState<IProductId>();
  // useEffect(() => {
  //   setProductId(initialId);
  //   console.log(typeof initialId, initialId);
  // }, []);
  const [productId, setProductId] = useState<IProductId>("");
  useEffect(() => {
    const productId = Number(router.query.id);
    // console.log(productId);
    if (productId) setProductId(productId);
  }, [router.query]);

  //delete API
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
      }
      deleteProduct(id);
      alert("삭제되었습니다");
      router.push("/category");
    }
  };

  // const [updateInfo, setUpdateInfo] = useState<IProduct>({
  //   id: Number(detailId),
  //   storeName: dataById?.storeName,
  //   imgUrl:
  //     "https://cdn.amondz.com/product/78140/resize/mainImg/PSI_828991.jpeg?v=1669878625346",
  //   originPrice: dataById?.originPrice,
  //   productName: dataById?.productName,
  //   categoryName: dataById?.categoryName,
  //   categoryId: dataById?.categoryId,
  // });
  // const {
  //   id,
  //   storeName,
  //   imgUrl,
  //   originPrice,
  //   productName,
  //   categoryName,
  //   categoryId,
  // }: IProductInfo = updateInfo;

  const onEditProduct = () => {
    console.log("edit");
  };
  // single product getAPI
  const singleGetProductQuery = (productId: number) => {
    const {
      isLoading,
      isError,
      isSuccess,
      data: singleProduct,
    } = useQuery([QUERY_KEYS.PRODUCT, productId], () =>
      getSingleProductAPI(productId)
    );
    if (isLoading) {
      return <h2>loading</h2>;
    }
    if (isError) {
      return <h2>Error</h2>;
    }
    if (isSuccess) {
      return (
        <>
          <ImageSection>
            <Img className="imageWrapper" src={singleProduct.img} />
          </ImageSection>
          <InfoSection>
            <div className="brandName">{singleProduct.brandName}</div>
            <Info>
              <div className="productName">{singleProduct.productName}</div>
              <div className="price">{singleProduct.price}</div>
            </Info>
            <ButtonContainer>
              <EditBtn onClick={() => onEditProduct()}>수정</EditBtn>
              <Button onClick={() => onDeleteProduct(singleProduct.id)}>
                삭제
              </Button>
            </ButtonContainer>
          </InfoSection>
        </>
      );
    }
  };

  return <DetailContainer>{singleGetProductQuery(productId)}</DetailContainer>;
};

export default ProductDetail;

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ImageSection = styled.div`
  min-width: calc(100% / 2);
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.div<IImg>`
  min-width: 90%;
  min-height: 90%;
  border: 1px solid #dadada;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => `url(${props.src})`};
  background-size: contain;
`;

const InfoSection = styled.div`
  min-width: calc(100% / 2);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 25px;
  .brandName {
    border-bottom: 1px solid grey;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 100%;
  flex-direction: column;
  .productName {
    font-size: 15px;
  }
  .price {
    font-size: 20px;
    font-weight: 500;
    ::after {
      content: "원";
      font-size: 15px;
    }
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Button = styled.button`
  width: 50px;
  height: 20px;
  border: none;
  background-color: #ff7700;
  color: white;
  border-radius: 3px;
  cursor: pointer;
`;
const EditBtn = styled(Button)`
  background-color: #5298c3;
  margin-right: 10px;
`;

// const Image = styled.image``;
