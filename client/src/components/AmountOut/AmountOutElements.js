import styled from "styled-components";

export const FormHeader = styled.div`
  /* border: 1px solid red; */

  position: relative;

  > h2 {
    color: #fff;
    font-weight: 400;
    margin-left: 10%;
    margin-top: 30px;
  }
`;

export const FormWrapper = styled.form`
  /* border: 1px solid red; */

  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  margin-top: 50px;
`;

export const FormContainer = styled.form`
  position: relative;
  width: 100%;
  padding: 20px;
  transition: 0.5s;
`;

export const InputRow = styled.div`
  /* border: 1px solid red; */

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 40px;
  margin: 10px auto;
`;

export const InputHeader = styled.div`
  /* border: 1px solid red; */

  position: relative;
  flex: 0.84;

  > h3 {
    font-size: 1.8em;
    z-index: 1;
    color: #ff6bb2;
    margin: 0;
  }
`;

export const InputLabel = styled.div`
  /* border: 1px solid red; */

  position: relative;
  flex: 0.3;
  color: #fff;

  > label {
  }
`;

export const InputBox = styled.div`
  /* border: 1px solid red; */

  position: relative;
  flex: 0.65;
  display: flex;
  align-items: center;
  color: #ff6bb2;
  margin: 10px;

  > button {
    width: 100%;
    outline: none;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    padding: 5px 20px;
    border: none;
    border-radius: 35px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-right: 2px solid rgba(255, 255, 255, 0.2);
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    letter-spacing: 1px;
    color: #fff;
  }

  > input {
    width: 100%;
    outline: none;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    padding: 12px 20px;
    border: none;
    border-radius: 35px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-right: 2px solid rgba(255, 255, 255, 0.2);
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    letter-spacing: 1px;
    color: #fff;
  }

  > input::placeholder {
    color: #fff;
  }
`;

export const ButtonWrapper = styled.div`
  position: relative;
  flex: 0.1;
  margin-top: 15px;
  margin-right: 12px;

  > button {
    width: 100%;
    outline: none;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    padding: 5px 20px;
    border: none;
    border-radius: 35px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-right: 2px solid rgba(255, 255, 255, 0.2);
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    letter-spacing: 1px;
    color: #fff;
  }
`;

export const Select = styled.select`
  width: 100%;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 10px 20px;
  border: none;
  border-radius: 35px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-right: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  letter-spacing: 1px;
  color: #fff;
`;

export const Option = styled.option``;
