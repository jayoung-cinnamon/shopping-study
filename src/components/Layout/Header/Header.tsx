import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaqueries";
import Link from "next/link";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "../../../plugin/reactQuerykeys";
import RegisterModal from "../../Register/RegisterModal";

const Header = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const setOpenModal = (e: React.MouseEvent) => {
    setOpen(!open);
    queryClient.setQueryData(QUERY_KEYS.REG_MODAL_OPEN, open);
  };

  // const { isFetching } = useQuery(QUERY_KEYS.REG_MODAL_OPEN);
  // if (isFetching) {
  //   console.log('변경')
  // }

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <MenuWrapper>
          <Logo>
            <Link href="/">로고</Link>
          </Logo>
          <Menu>
            <Link href="/category">카테고리</Link>
          </Menu>
          <Menu>
            <Link href="/brand">브랜드</Link>
          </Menu>
        </MenuWrapper>
        <MenuRightWrapper>
          <SearchWrapper>검색</SearchWrapper>

          <ShoppingCart>장바구니</ShoppingCart>

          <RegisterWrapper isOpen={open} onClick={setOpenModal}>
            등록
          </RegisterWrapper>
          {open === true && <RegisterModal isOpen={open} />}
        </MenuRightWrapper>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #dadada;
  padding: 0 60px 0 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mediaQueries.tablet`
    font-size: 20px;
    padding: 0 30px 0 30px;
  `}
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div`
  margin-right: 20px;
`;

const MenuWrapper = styled.ul`
  display: flex;
`;
const Menu = styled.li`
  margin-right: 20px;
`;

const MenuRightWrapper = styled.div`
  display: flex;
`;
const SearchWrapper = styled.div`
  margin-right: 20px;
`;
const ShoppingCart = styled.div``;

interface IRegister {
  isOpen: boolean;
}
const RegisterWrapper = styled.div<IRegister>`
  margin-left: 20px;
  cursor: pointer;
  color: ${(props) => (props.isOpen ? "red" : "black")};
`;
