import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { GET_USER } from "../../states/appSlice";

import {
  FormHeader,
  FormWrapper,
  FormItem,
  FormLabel,
  FormInput,
  Select,
  Option,
  FormBottom,
  FormBottomLeft,
  FormBottomRight,
} from "./CardFrontElements";
import { Button } from "@material-ui/core";

const CardFront = ({ web3, contracts }) => {
  const user = useSelector(GET_USER);

  const [tokens, setTokens] = useState([]);

  const [tokenAAmount, setTokenAAmount] = useState(0);
  const [tokenBAmount, setTokenBAmount] = useState(0);

  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");

  const [recipient, setRecipient] = useState(
    "0x622B6c3834D0372F7f3681fa953C26b9DC1d0C6e"
  );

  useEffect(() => {
    const init = async () => {
      const rawTokens = await contracts.uniswap.methods.getTokens().call();
      const tokens = rawTokens.map((token) => ({
        ...token,
        ticker: web3.utils.hexToUtf8(token.ticker),
      }));

      setTokens(tokens);
    };
    init();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fixedAmountA = web3.utils.toWei(tokenAAmount, "ether");
    const fixedAmountB = web3.utils.toWei(tokenBAmount, "ether");

    const tokenAAddress = contracts[tokenA].options.address;
    const tokenBAddress = contracts[tokenB].options.address;

    try {
      await contracts[tokenA].methods
        .approve(contracts.uniswap.options.address, fixedAmountA)
        .send({ from: user });

      const result = await contracts.uniswap.methods
        .swap(
          tokenAAddress,
          tokenBAddress,
          fixedAmountA,
          fixedAmountB,
          recipient
        )
        .send({ from: user });

      setTokenA("");
      setTokenB("");
      setTokenAAmount("");
      setTokenBAmount("");
      // setRecipient("");
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <FormHeader>
        <h2>SWAP</h2>
      </FormHeader>
      <FormWrapper onSubmit={handleSubmit}>
        <FormItem>
          <FormLabel>Token A</FormLabel>

          <FormInput>
            <Select onChange={(e) => setTokenA(e.target.value)}>
              <Option>Token A</Option>
              {tokens.map((token, idx) => (
                <Option key={idx} value={token.ticker}>
                  {token.ticker}
                </Option>
              ))}
            </Select>
          </FormInput>
        </FormItem>

        <FormItem>
          <FormLabel>Amount A</FormLabel>
          <FormInput>
            <input
              type="number"
              value={tokenAAmount}
              onChange={(e) => setTokenAAmount(e.target.value)}
            />
          </FormInput>
        </FormItem>

        <FormItem>
          <FormLabel>Token B</FormLabel>

          <FormInput>
            <Select onChange={(e) => setTokenB(e.target.value)}>
              <Option>Token B</Option>
              {tokens.map((token, idx) => (
                <Option key={idx} value={token.ticker}>
                  {token.ticker}
                </Option>
              ))}
            </Select>
          </FormInput>
        </FormItem>

        <FormItem>
          <FormLabel>Amount B</FormLabel>
          <FormInput>
            <input
              type="number"
              value={tokenBAmount}
              onChange={(e) => setTokenBAmount(e.target.value)}
            />
          </FormInput>
        </FormItem>

        <FormItem>
          <FormLabel>Recipient</FormLabel>
          <FormInput>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </FormInput>
        </FormItem>

        <FormBottom>
          <FormBottomLeft></FormBottomLeft>
          <FormBottomRight>
            <Button type="submit">Submit</Button>
          </FormBottomRight>
        </FormBottom>
      </FormWrapper>
    </>
  );
};

export default CardFront;
