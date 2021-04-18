import styled from "styled-components";

export const FormWrapper = styled.form`
  /* border: 1px solid red; */

  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  margin-top: 50px;
`;

export const FormHeader = styled.div`
  /* border: 1px solid red; */

  position: relative;

  > h2 {
    color: #fff;
    font-weight: 400;
    margin-left: 10%;
    margin-top: 30px;
    /* border-bottom: 1px solid #fff;
    width: 60%; */
  }
`;

export const FormItem = styled.div`
  /* border: 1px solid red; */

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 40px;
  margin: 10px auto;
`;

export const FormLabel = styled.span`
  /* border: 1px solid red; */

  flex: 0.3;
  padding: 10px 20px;
  border: none;
  border-radius: 35px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-right: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  letter-spacing: 1px;
  color: #fff;
  font-weight: 500;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

export const FormInput = styled.div`
  /* border: 1px solid red; */

  flex: 0.6;
  display: flex;
  width: 100%;

  > input {
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
  }

  > input::placeholder {
    color: #fff;
  }

  > input[type="button"] {
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
  }

  > button {
    width: 50%;
    outline: none;
    background: rgba(255, 255, 255, 0.35);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    padding: 5px 20px;
    border: none;
    border-radius: 5px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-right: 2px solid rgba(255, 255, 255, 0.2);
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    letter-spacing: 1px;
    color: #fff;
  }

  .active {
    box-shadow: 1px 1px 1px rgba(255, 255, 255, 1);
    background: rgba(255, 255, 255, 0.05);
  }

  .disabled {
    background: rgba(255, 255, 255, 0.05);
    border: none;
  }
`;

export const FormBottom = styled.div`
  /* border: 1px solid red; */

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 40px;
  margin: 10px auto;
  color: #333333;
`;

export const FormBottomLeft = styled.div`
  /* border: 1px solid red; */
`;

export const FormBottomRight = styled.div`
  /* border: 1px solid red; */

  flex: 0.2;

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
