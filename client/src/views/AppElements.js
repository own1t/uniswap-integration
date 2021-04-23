import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  /* border: 1px solid red; */

  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #f1f4f9, #dff1ff);
  overflow: hidden;
`;

export const ColorDivider = styled.div`
  position: absolute;
  filter: blur(150px);

  &:nth-child(1) {
    width: 80%;
    height: 70%;
    top: 0;
    left: 10%;
    background: #ff6bb2;
  }

  &:nth-child(2) {
    width: 90%;
    height: 20%;
    bottom: 0;
    left: 5%;
    background: #ff6bb2;
  }

  &:nth-child(3) {
    width: 50%;
    height: 20%;
    bottom: 0;
    left: 30%;
    background: #ff6bb2;
  }
`;

export const Section = styled.div`
  /* border: 1px solid red; */
`;

export const Content = styled.div`
  /* border: 1px solid red; */

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  width: 75%;
  height: 70vh;
  margin-left: auto;
  margin-right: auto;
`;

export const Wrapper = styled.div`
  /* border: 1px solid red; */

  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TokenOptionModal = styled.div`
  /* border: 1px solid red; */

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  width: 35%;
  box-shadow: 15px 15px 15px 15px rgba(0, 0, 0, 0.08);
`;

const animate = keyframes`
    0%,
    100% {
      transform: translateY(-40px);
    }
    50% {
      transform: translateY(40px);
    }
`;

export const Square = styled.div`
  position: absolute;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  animation-name: ${animate};
  animation-duration: 8s;
  animation-iteration-count: infinite;

  &:nth-child(1) {
    top: -50px;
    right: -60px;
    width: 100px;
    height: 100px;
  }

  &:nth-child(2) {
    top: 150px;
    left: -100px;
    width: 120px;
    height: 120px;
    z-index: 2;
  }

  &:nth-child(3) {
    bottom: 50px;
    right: -60px;
    width: 80px;
    height: 80px;
    z-index: 2;
  }

  &:nth-child(4) {
    bottom: -80px;
    left: 100px;
    width: 50px;
    height: 50px;
  }

  &:nth-child(5) {
    bottom: -80px;
    left: 800px;
    width: 90px;
    height: 90px;
  }

  &:nth-child(6) {
    top: 120px;
    left: 750px;
    width: 50px;
    height: 50px;
  }
  }
`;
