import React, { useCallback, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "react-query";
import { QUERY_KEYS } from "../../plugin/reactQuerykeys";
import ModalFrame from "./ModalFrame";
import { IProduct } from "../../types/productTypes";
import { postProductAPI } from "../../plugin/axios";
import { monotonicFactory } from "ulid";
import { useRouter } from "next/router";
const Register = (isOpen: any) => {
  const router = useRouter();
  const { data: isModalOpen } = useQuery(QUERY_KEYS.REG_MODAL_OPEN, {
    initialData: "",
    staleTime: Infinity,
  });
  const ulid = monotonicFactory();

  const [productData, setProductData] = useState<IProduct>({
    ulid: ulid(1000),
    id: ulid,
    productName: "",
    price: 0,
    like: 0,
    categoryId: 0,
    categoryName: "default",
    brandName: "default",
  });
  //React-query : post
  const mutation = useMutation((productData: IProduct) =>
    postProductAPI(productData)
  );

  //onClick post
  const onClickPost = useCallback(
    async (e: any, productData: IProduct) => {
      if (
        productData.price === 0 ||
        productData.productName.length === 0 ||
        productData.brandName === "default" ||
        productData.brandName.length === 0 ||
        productData.categoryName === "default"
      ) {
        e.preventDefault();
        alert("모두 입력해주세요");
        return false;
      }
      await mutation.mutateAsync(productData);
      window.alert("등록되었습니다");
      // router.push(`/product/${productData.categoryName}/${productData.id}`);
    },
    [mutation]
  );
  const onChangeProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name == "price" || name == "categoryId") {
      value = parseInt(value);
    }
    setProductData({
      ...productData,
      [name]: value,
      //categoryId 1 : ring, 2: bracelet, 3: necklace, 4: earing
      categoryId:
        value === "ring"
          ? 1
          : value === "bracelet"
          ? 2
          : value === "necklace"
          ? 3
          : 4,
    });
  };
  return (
    <ModalFrame isOpen={isOpen}>
      <ModalContainer>
        <Title>제품등록</Title>
        <ModalWrapper>
          <form>
            <div>
              <div>
                제품이름
                <input onChange={onChangeProduct} name="productName" />
              </div>
              <div>
                가격
                <input
                  type="number"
                  min="0"
                  onChange={onChangeProduct}
                  name="price"
                />
              </div>
              <div>
                브랜드네임
                <input name="brandName" onChange={onChangeProduct}></input>{" "}
              </div>
              <div>
                카테고리
                <select
                  className="categorySelect"
                  name="categoryName"
                  onChange={onChangeProduct}
                >
                  <option>카테고리 선택</option>
                  <option value="ring">ring</option>
                  <option value="bracelet">bracelet</option>
                  <option value="necklace">necklace</option>
                  <option value="earing">earing</option>
                </select>
              </div>
            </div>
            <RegBtn type="submit" onClick={(e) => onClickPost(e, productData)}>
              등록
            </RegBtn>
          </form>
        </ModalWrapper>
      </ModalContainer>
    </ModalFrame>
  );
};

export default Register;

const ModalContainer = styled.div`
  min-width: 500px;
  /* min-height: 500px; */
  display: flex;
  flex-direction: column;
  color: black;
  div {
    cursor: pointer;
  }
`;

const ModalWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  div {
    font-size: 15px;
    margin-bottom: 10px;
  }
  input {
    height: 25px;
    width: 200px;
    border: none;
    border: 1px solid grey;
    width: 100px;
    border-radius: 5px;
    margin-left: 10px;
  }
  form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const RegBtn = styled.button`
  border: none;
  background-color: #1c1c83;
  border-radius: 5px;
  color: white;
  height: 30px;
  width: 50px;
  font-size: 13px;
  cursor: pointer;
  :hover {
    background-color: red;
  }
`;
