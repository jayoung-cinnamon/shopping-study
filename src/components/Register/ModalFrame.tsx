import React from "react";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { QUERY_KEYS } from "../../plugin/reactQuerykeys";
import { mediaQueries } from "../../styles/mediaqueries";
const ModalFrame = (
  { children }: { children: JSX.Element },
  { isOpen }: { isOpen: any }
) => {
  const { data } = useQuery(QUERY_KEYS.REG_MODAL_OPEN, isOpen);
  const queryClient = useQueryClient();
  const closeModal = (e: React.MouseEvent) => {
    queryClient.setQueryData(QUERY_KEYS.REG_MODAL_OPEN, !isOpen);
    console.log(data);
  };

  return (
    <Container>
      <Background />
      <ModalBlock>
        <ClosedBtn onClick={closeModal}>X</ClosedBtn>
        <Content>{children}</Content>
      </ModalBlock>
    </Container>
  );
};
export default ModalFrame;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(219, 219, 219, 0.15);
  backdrop-filter: blur(5px);
`;
const ModalBlock = styled.div`
  position: absolute;
  top: 6.5rem;
  border-radius: 5px;
  padding: 1.5rem;
  background-color: white;
  /* width: 60rem; */
  border: 1px solid grey;

  ${mediaQueries.tablet`
     width: 50rem;
  `}
`;
const ClosedBtn = styled.button`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  cursor: pointer;
  color: black;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
