import styled from "styled-components";

export const Nav = styled.nav`
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10vh;
  z-index: 10;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  margin-top: 70px;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  padding: 0 24px;
`;

export const NavLogo = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  z-index: 2;

  > .MuiSvgIcon-root {
    color: #ff6bb2;
    font-size: 2.25rem;
    margin-right: 5px;
  }

  &:hover {
    > .MuiSvgIcon-root {
      color: #fff;
    }
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 960px) {
    display: none;
    padding: 0;
  }
`;

export const NavItem = styled.li``;

export const NavBox = styled.div`
  /* border: 1px solid red; */

  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  height: 30px;
  margin-left: 50px;
  padding: 10px 12px;
  border-radius: 10px;

  > h4 {
    color: #fff;
    margin: 0;
    margin-right: 3px;
    font-weight: 400;
  }

  > a {
    color: #000;
    text-decoration: none;
    margin-left: 5px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);

    > a {
      color: #fff;
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBox2 = styled.div`
  display: flex;
  align-items: center;

  height: 30px;
  margin-left: 50px;
  padding: 10px 12px;
  border-radius: 10px;

  > h4 {
    color: #fff;
    margin: 0;
    margin-right: 3px;
    font-weight: 400;
  }

  > a {
    color: #000;
    text-decoration: none;
    margin-left: 5px;
  }

  &:hover {
    > a {
      color: #fff;
    }
  }

  > button {
    color: #fff;
    padding: 7px;
    border: 1px solid #fff;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
