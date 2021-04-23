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
} from "./LiquidityElements";
import { Button } from "@material-ui/core";

const DIRECTION = {
  ADD: "ADD",
  REMOVE: "REMOVE",
};

const Liquidity = ({ web3, contracts }) => {
  const user = useSelector(GET_USER);

  const [tokens, setTokens] = useState([]);

  const [direction, setDirection] = useState(DIRECTION.ADD);

  const [tokenAAmount, setTokenAAmount] = useState(0);
  const [tokenBAmount, setTokenBAmount] = useState(0);

  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");

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

    if ((tokenA && tokenB !== "") || (tokenAAmount && tokenBAmount !== 0)) {
      const tokenAAddress = contracts[tokenA].options.address;
      const tokenBAddress = contracts[tokenB].options.address;

      try {
        if (direction === DIRECTION.ADD) {
          const fixedAmountA = web3.utils.toWei(tokenAAmount, "ether");
          const fixedAmountB = web3.utils.toWei(tokenBAmount, "ether");

          await contracts[tokenA].methods
            .approve(contracts.uniswap.options.address, fixedAmountA)
            .send({ from: user });

          await contracts[tokenB].methods
            .approve(contracts.uniswap.options.address, fixedAmountB)
            .send({ from: user });

          await contracts.uniswap.methods
            .addLiquidity(
              tokenAAddress,
              tokenBAddress,
              fixedAmountA,
              fixedAmountB
            )
            .send({ from: user });

          alert(`Adding Liquidity for ${tokenA} and ${tokenB} has proceeded`);
        } else if (direction === DIRECTION.REMOVE) {
          await contracts.uniswap.methods
            .removeLiquidity(tokenAAddress, tokenBAddress)
            .send({ from: user });

          alert(`Removing Liquidity for ${tokenA} and ${tokenB} has proceeded`);
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  return (
    <>
      <FormHeader>
        <h2>LIQUIDITY</h2>
      </FormHeader>
      <FormWrapper onSubmit={handleSubmit}>
        <FormItem>
          <FormLabel>Direction</FormLabel>
          <FormInput>
            <Button
              className={`${direction === DIRECTION.ADD ? "active" : ""}`}
              onClick={() => setDirection(DIRECTION.ADD)}
            >
              ADD
            </Button>
            <Button
              className={`${direction === DIRECTION.REMOVE ? "active" : ""}`}
              onClick={() => setDirection(DIRECTION.REMOVE)}
            >
              REMOVE
            </Button>
          </FormInput>
        </FormItem>

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
            {direction === DIRECTION.ADD ? (
              <input
                value={tokenAAmount}
                onChange={(e) => setTokenAAmount(e.target.value)}
                required
              />
            ) : (
              <input
                className="disabled"
                type="number"
                value="undefined"
                readOnly
              />
            )}
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
            {direction === DIRECTION.ADD ? (
              <input
                value={tokenBAmount}
                onChange={(e) => setTokenBAmount(e.target.value)}
                required
              />
            ) : (
              <input
                className="disabled"
                type="number"
                value="undefined"
                readOnly
              />
            )}
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

export default Liquidity;
