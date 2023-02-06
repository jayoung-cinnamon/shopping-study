import React from "react";
import CategorySection from "./CategorySection";
import styled from "styled-components";
import ProductList from "../Product/ProductList";
const CategoryMain = () => {
  return (
    <CategoryContainer>
      <CategorySection />
      <ProductList />
    </CategoryContainer>
  );
};
export default CategoryMain;

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
`;
