import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { SET_CONTRACT_ADDRESS, SET_USER } from "../states/appSlice";

import { getWeb3, getContracts } from "../utils";

import {
  Container,
  ColorDivider,
  Square,
  Content,
  TokenOptionModal,
  Wrapper,
} from "./AppElements";

import LoadingContainer from "../components/loading-container";
import FlipCard from "../components/flip-card/index";
import Header from "../components/header";
import Wallet from "../components/wallet";
import AddToken from "../components/add-token";
import AmountOut from "../components/amount-out";

import CardBack from "../components/card-back";
import CardFront from "../components/card-front";

const App = () => {
  const dispatch = useDispatch();

  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contracts, setContracts] = useState(undefined);

  const [isOpen, setIsOpen] = useState(false);
  const [tokenOptionToggle, setTokenOptionToggle] = useState(false);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const contracts = await getContracts(web3);
      const accounts = await web3.eth.getAccounts();

      dispatch(
        SET_USER({
          user: accounts[0],
        })
      );

      dispatch(
        SET_CONTRACT_ADDRESS({
          contract_address: contracts.uniswap.options.address,
        })
      );

      setWeb3(web3);
      setContracts(contracts);
      setAccounts(accounts);
    };
    init();
  }, []);

  const handleTokenOptionToggle = () => {
    setIsOpen(!isOpen);
    setTokenOptionToggle(!tokenOptionToggle);
  };

  return (
    <>
      {typeof web3 !== "undefined" &&
      typeof contracts !== "undefined" &&
      accounts.length > 0 ? (
        <Container>
          <ColorDivider></ColorDivider>
          <ColorDivider></ColorDivider>
          <ColorDivider></ColorDivider>
          <Header toggle={handleTokenOptionToggle} />
          <Content>
            <Square></Square>
            <Square></Square>
            <Square></Square>
            <Square></Square>
            <Square></Square>
            <Square></Square>
            <TokenOptionModal isOpen={isOpen}>
              <AddToken
                web3={web3}
                contracts={contracts}
                toggle={handleTokenOptionToggle}
              />
            </TokenOptionModal>
            <Wrapper>
              <FlipCard
                web3={web3}
                contracts={contracts}
                front={<CardFront web3={web3} contracts={contracts} />}
                back={<CardBack web3={web3} contracts={contracts} />}
              />
            </Wrapper>
            <Wrapper>
              <FlipCard
                web3={web3}
                contracts={contracts}
                front={<AmountOut web3={web3} contracts={contracts} />}
                back={<Wallet web3={web3} contracts={contracts} />}
              />
            </Wrapper>
          </Content>
        </Container>
      ) : (
        <LoadingContainer />
      )}
    </>
  );
};

export default App;
