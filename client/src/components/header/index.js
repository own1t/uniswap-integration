import React from "react";

import { useSelector } from "react-redux";
import { GET_USER, GET_CONTRACT_ADDRESS } from "../../states/appSlice";

import {
  Nav,
  NavContainer,
  NavLogo,
  NavMenu,
  NavBox,
  NavBox2,
} from "./HeaderElements";
import { SwapHorizontalCircle } from "@material-ui/icons";
import { Button } from "@material-ui/core";

import { truncate } from "../../utils";

const Header = ({ toggle }) => {
  const user = useSelector(GET_USER);
  const contractAddress = useSelector(GET_CONTRACT_ADDRESS);

  return (
    <Nav>
      <NavContainer>
        <NavLogo href="https://uniswap-c0b91.web.app/">
          <SwapHorizontalCircle />
          <h1>Uniswap Integration</h1>
        </NavLogo>

        <NavMenu>
          <NavBox2>
            <h4>Contract Address: </h4>
            <a
              href={`//rinkeby.etherscan.io/address/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {truncate(contractAddress, 15)}
            </a>
          </NavBox2>

          <NavBox>
            <h4>Current Account: </h4>
            <a
              href={`//rinkeby.etherscan.io/address/${user}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {truncate(user, 15)}
            </a>
          </NavBox>
          <NavBox2>
            <Button onClick={toggle}>Add Token</Button>
          </NavBox2>
        </NavMenu>
      </NavContainer>
    </Nav>
  );
};

export default Header;
