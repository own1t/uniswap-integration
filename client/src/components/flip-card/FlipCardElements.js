import styled, { css } from "styled-components";

export const Container = styled.div`
  /* border: 1px solid red; */

  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 0;
  width: 100%;
  height: 50vh;

  transition: z-index 500ms, transform 500ms;
  transform-style: preserve-3d;
  perspective: 1000px;
  -webkit-perspective: 1000px;
  margin-top: 0;

  &.flipped {
    z-index: 1;
  }
`;

export const Wrapper = styled.div`
  /* border: 1px solid red; */

  position: relative;
  width: 70%;
  height: 100%;
  transition: all 1.5s ease-in-out;
  transform-style: preserve-3d;
  margin-left: auto;
  margin-right: auto;

  &.flipped {
    transform: rotateY(180deg);
  }

  @media screen and (max-width: 1050px) {
    width: 70%;
  }

  @media screen and (max-width: 1050px) {
  }
`;

export const CardStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  /* padding: 40px; */
  backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-right: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 0 20px 0 20px;
`;

export const CardFrontContainer = styled.div`
  border: 1px solid red;

  ${CardStyle}
  z-index: 0;

  > .MuiSvgIcon-root {
    position: absolute;
    right: 30px;
    top: 30px;
    color: #fff;
    cursor: pointer;
    z-index: 10;
  }
`;

export const CardBackContainer = styled.div`
  border: 1px solid red;

  ${CardStyle}
  transform: rotateY(180deg);
  z-index: 1;

  > .MuiSvgIcon-root {
    position: absolute;
    right: 30px;
    top: 30px;
    color: #fff;
    cursor: pointer;
    z-index: 10;
  }
`;
