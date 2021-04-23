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
} from "./SwapElements";
import { Button } from "@material-ui/core";

const Swap = ({ web3, contracts }) => {
  const user = useSelector(GET_USER);

  const [tokens, setTokens] = useState([]);

  const [tokenAAmount, setTokenAAmount] = useState(0);
  const [tokenBAmount, setTokenBAmount] = useState(0);

  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");

  const [recipient, setRecipient] = useState("");

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

      await contracts.uniswap.methods
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
      setRecipient("");
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
              value={tokenAAmount}
              onChange={(e) => setTokenAAmount(e.target.value)}
              required
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
              value={tokenBAmount}
              onChange={(e) => setTokenBAmount(e.target.value)}
              required
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
              required
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

export default Swap;
