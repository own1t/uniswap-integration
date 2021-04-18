import React, { useEffect, useState } from "react";

import {
  InputHeader,
  InputRow,
  InputLabel,
  InputBox,
  Select,
  Option,
  ButtonWrapper,
  FormHeader,
  FormWrapper,
} from "./AmountOutElements";
import { Button } from "@material-ui/core";
import { formatNumber } from "../../utils";

const AmountOut = ({ web3, contracts }) => {
  const [tokens, setTokens] = useState([]);

  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const [amountIn, setAmountIn] = useState(0);

  const [amountOut, setAmountOut] = useState(0);

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

    const fixedAmountIn = web3.utils.toWei(amountIn, "ether");

    const tokenAAddress = contracts[tokenA].options.address;
    const tokenBAddress = contracts[tokenB].options.address;

    try {
      const result = await contracts.uniswap.methods
        .getAmountOutMin(tokenAAddress, tokenBAddress, fixedAmountIn)
        .call();

      const amountOut = web3.utils.fromWei(result, "ether");
      setAmountOut(amountOut);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <FormHeader>
        <h2>Get Minimum Amount Out</h2>
      </FormHeader>

      <FormWrapper onSubmit={handleSubmit}>
        <InputRow>
          <InputLabel>
            <label>Token A</label>
          </InputLabel>
          <InputBox>
            <Select onChange={(e) => setTokenA(e.target.value)}>
              <Option>Token A</Option>
              {tokens.map((token, idx) => (
                <Option key={idx} value={token.ticker}>
                  {token.ticker}
                </Option>
              ))}
            </Select>
          </InputBox>
        </InputRow>

        <InputRow>
          <InputLabel>
            <label>Token B</label>
          </InputLabel>
          <InputBox>
            <Select onChange={(e) => setTokenB(e.target.value)}>
              <Option>Token B</Option>
              {tokens.map((token, idx) => (
                <Option key={idx} value={token.ticker}>
                  {token.ticker}
                </Option>
              ))}
            </Select>
          </InputBox>
        </InputRow>

        <InputRow>
          <InputLabel>
            <label>Amount In</label>
          </InputLabel>
          <InputBox>
            <input
              type="text"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
              required
            />
          </InputBox>
        </InputRow>

        <InputRow>
          <InputHeader></InputHeader>
          <ButtonWrapper>
            <Button type="submit">SUBMIT</Button>
          </ButtonWrapper>
        </InputRow>
      </FormWrapper>

      <FormWrapper>
        <InputRow>
          <InputLabel>
            <label>Amount Out</label>
          </InputLabel>
          <InputBox>
            <input type="text" value={formatNumber(amountOut)} readOnly />
          </InputBox>
        </InputRow>
      </FormWrapper>
    </>
  );
};

export default AmountOut;
