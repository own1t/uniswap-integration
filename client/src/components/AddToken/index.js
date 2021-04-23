import React, { useState } from "react";

import {
  Container,
  FormContainer,
  InputRow,
  InputHeader,
  InputLabel,
  InputBox,
  ButtonWrapper,
} from "./AddTokenElements";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { GET_USER } from "../../states/appSlice";
import { Clear } from "@material-ui/icons";

const AddToken = ({ web3, contracts, toggle }) => {
  const user = useSelector(GET_USER);

  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await contracts.uniswap.methods
        .addToken(web3.utils.fromAscii(tokenSymbol), tokenAddress)
        .send({ from: user });

      setTokenSymbol("");
      setTokenAddress("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <InputHeader>
          <h3>Add Token</h3> <Clear onClick={toggle} />
        </InputHeader>
        <InputRow>
          <InputLabel>
            <label>Token Symbol</label>
          </InputLabel>
          <InputBox>
            <input
              type="text"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              required
            />
          </InputBox>
        </InputRow>
        <InputRow>
          <InputLabel>
            <label>Token Address</label>
          </InputLabel>
          <InputBox>
            <input
              type="text"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
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
      </FormContainer>
    </Container>
  );
};

export default AddToken;
