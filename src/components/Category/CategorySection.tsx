import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled, { css } from "styled-components";
import { QUERY_KEYS } from "../../plugin/reactQuerykeys";
import { ICategoryProps } from "../../types/productTypes";
const CategorySection = () => {
  const queryClient = useQueryClient();
  interface IChecked {
    all: boolean;
    ring: boolean;
    bracelet: boolean;
    necklace: boolean;
    earing: boolean;
  }

  const [checked, setChecked] = useState<IChecked>({
    all: true,
    ring: true,
    bracelet: true,
    necklace: true,
    earing: true,
  });
  // React-query : post

  // category filtering

  const [filteredList, setFilteredList] = useState([""]);

  useEffect(() => {
    const categoryList: string[] = [""];
    const toArray = Object.entries(checked);
    toArray.filter(([key, value]) =>
      value === true ? categoryList.push(key) : null
    );
    const filterList = categoryList.includes("all")
      ? ["ring", "earing", "necklace", "bracelet"]
      : categoryList;
    const requestParams = {
      categoryName: filterList,
    };
    queryClient.setQueryData(QUERY_KEYS.FILTERS, requestParams);
  }, [checked]);

  const onClickCategory = (title: string, checked: boolean) => {
    if ((title === "all") === true) {
      console.log("1");
      setChecked((prev) => {
        return {
          ...prev,
          all: checked,
          ring: checked,
          bracelet: checked,
          necklace: checked,
          earing: checked,
        };
      });
    }
    if (
      (title === "all") === false &&
      (title === "ring") === false &&
      (title === "bracelet") === false &&
      (title === "necklace") === false &&
      (title === "earing") === false
    ) {
      console.log("2");
      setChecked((prev) => {
        return { ...prev, [title]: true };
      });
    } else {
      console.log("3");
      setChecked((prev) => {
        return { ...prev, all: false, [title]: checked };
      });
    }
  };

  useEffect(() => {
    onClickCategory;
  }, [checked]);

  const RenderCategory: React.FC<any> = React.memo(({ title, checked }) => {
    return (
      <CategoryMenu>
        <Category
          onClick={() => onClickCategory(title, !checked)}
          selected={checked}
        >
          {title}
        </Category>
      </CategoryMenu>
    );
  });

  return (
    <CategoryContainer>
      <Title>Category</Title>
      <RenderCategory title={"all"} checked={checked.all} />
      <RenderCategory title={"ring"} checked={checked.ring} />
      <RenderCategory title={"bracelet"} checked={checked.bracelet} />
      <RenderCategory title={"necklace"} checked={checked.necklace} />
      <RenderCategory title={"earing"} checked={checked.earing} />
    </CategoryContainer>
  );
};

export default CategorySection;

const CategoryContainer = styled.div`
  width: 165px;
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 20px;
  div {
    margin-bottom: 20px;
  }
`;

const CategoryMenu = styled.ul`
  margin-bottom: 10px;
`;

interface ICategory {
  selected: boolean;
}

const Category = styled.li<ICategory>`
  cursor: pointer;
  font-size: 15px;
  font-weight: 300;
  color: ${(props) => (props.selected ? "black" : "#b5b5b5")};
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
`;
