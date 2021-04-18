import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { GET_USER } from "../../states/appSlice";

import {
  FormContainer,
  InputRow,
  InputHeader,
  InputLabel,
  InputBox,
  Select,
  Option,
  ButtonGroup,
  ButtonWrapper,
} from "./WalletElements";
import { Button } from "@material-ui/core";

import { formatNumber } from "../../utils";

const DIRECTION = {
  WITHDRAW: "WITHDRAW",
  DEPOSIT: "DEPOSIT",
};

const Wallet = ({ web3, contracts }) => {
  const user = useSelector(GET_USER);

  const [tokens, setTokens] = useState([]);

  const [selectedToken, setSelectedToken] = useState(undefined);
  const [walletBalance, setWalletBalance] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);

  const [direction, setDirection] = useState(DIRECTION.DEPOSIT);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const init = async () => {
      const rawTokens = await contracts.uniswap.methods.getTokens().call();
      const tokens = rawTokens.map((token) => ({
        ...token,
        ticker: web3.utils.hexToUtf8(token.ticker),
      }));

      const balances = await getBalances(tokens[0].ticker);

      console.log(balances);
      setTokens(tokens);
      setSelectedToken(tokens[0].ticker);
      setWalletBalance(balances.fixedWalletBalance);
      setContractBalance(balances.fixedContractBalance);
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      const balances = await getBalances(selectedToken);

      setWalletBalance(balances.fixedWalletBalance);
      setContractBalance(balances.fixedContractBalance);
    };
    if (typeof selectedToken !== "undefined") {
      init();
    }
  }, [selectedToken]);

  const getBalances = async (token) => {
    const walletBalance = await contracts[token].methods.balanceOf(user).call();

    const contractBalance = await contracts[token].methods
      .balanceOf(contracts.uniswap.options.address)
      .call();

    const fixedWalletBalance = web3.utils.fromWei(walletBalance);

    const fixedContractBalance = web3.utils.fromWei(contractBalance);

    return { fixedWalletBalance, fixedContractBalance };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tokenAmount = web3.utils.toWei(amount, "ether");

    if (direction === DIRECTION.DEPOSIT) {
      try {
        await contracts[selectedToken].methods
          .approve(contracts.uniswap.options.address, tokenAmount)
          .send({ from: user });

        await contracts.uniswap.methods
          .deposit(web3.utils.fromAscii(selectedToken), tokenAmount)
          .send({ from: user });

        const balances = await getBalances(selectedToken);
        setWalletBalance(balances.fixedWalletBalance);
        setContractBalance(balances.fixedContractBalance);
        setAmount(0);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await contracts.uniswap.methods
          .withdraw(web3.utils.fromAscii(selectedToken), tokenAmount)
          .send({ from: user });

        const balances = await getBalances(selectedToken);
        setWalletBalance(balances.fixedWalletBalance);
        setContractBalance(balances.fixedContractBalance);

        setAmount(0);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <h2>{selectedToken}</h2>
        <InputRow>
          <InputHeader>
            <h3>Balance for {selectedToken}</h3>
          </InputHeader>

          <ButtonWrapper>
            <Select onChange={(e) => setSelectedToken(e.target.value)}>
              {tokens.map((token, idx) => (
                <Option key={idx} value={token.ticker}>
                  {token.ticker}
                </Option>
              ))}
            </Select>
          </ButtonWrapper>
        </InputRow>

        <InputRow>
          <InputLabel>
            <label>Wallet Balance</label>
          </InputLabel>
          <InputBox>
            <input type="number" value={formatNumber(walletBalance)} readOnly />
          </InputBox>
        </InputRow>

        <InputRow>
          <InputLabel>
            <label>Contract Balance</label>
          </InputLabel>
          <InputBox>
            <input
              type="number"
              value={formatNumber(contractBalance)}
              readOnly
            />
          </InputBox>
        </InputRow>

        <InputRow>
          <InputLabel>
            <label>Direction</label>
          </InputLabel>
          <InputBox>
            <ButtonGroup>
              <Button
                className={direction === DIRECTION.DEPOSIT ? "active" : ""}
                onClick={() => setDirection(DIRECTION.DEPOSIT)}
              >
                DEPOSIT
              </Button>
              <Button
                className={direction === DIRECTION.WITHDRAW ? "active" : ""}
                onClick={() => setDirection(DIRECTION.WITHDRAW)}
              >
                WITHDRAW
              </Button>
            </ButtonGroup>
          </InputBox>
        </InputRow>

        <InputRow>
          <InputLabel>
            <label>Amount</label>
          </InputLabel>
          <InputBox>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </InputBox>
        </InputRow>

        <InputRow>
          <InputHeader></InputHeader>
          <ButtonWrapper>
            <Button type="submit">SUBMIT</Button>
          </ButtonWrapper>
        </InputRow>
      </FormContainer>
    </>
  );
};

export default Wallet;
