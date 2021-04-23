import styled from "styled-components";

export const FormContainer = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  margin-top: 90px;
  overflow: hidden;

  > h2 {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.2;
    font-size: 12em;
    color: #fff;
    pointer-events: none;
  }
`;

export const InputRow = styled.div`
  /* border: 1px solid red; */

  position: relative;
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
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  > h3 {
    font-size: 1.8em;
    text-align: left;
    z-index: 1;
    color: #fff;
    margin: 0;
    margin-bottom: 5px;
  }
`;

export const InputLabel = styled.div`
  /* border: 1px solid red; */

  position: relative;
  flex: 0.4;
  color: #fff;
`;

export const InputBox = styled.div`
  /* border: 1px solid red; */

  position: relative;
  flex: 0.7;
  display: flex;
  align-items: center;
  color: #fff;
  margin: 10px;

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
`;

export const ButtonGroup = styled.div`
  position: relative;
  width: 100%;

  > button {
    width: 50%;
    outline: none;
    background: rgba(255, 255, 255, 0.2);
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
    box-shadow: 2px 2px 2px rgba(255, 255, 255, 1);
    background: rgba(255, 255, 255, 0.05);
    border: none;
  }

  .disabled {
    background: rgba(255, 255, 255, 0.05);
    border: none;
  }
`;

export const ButtonWrapper = styled.div`
  position: relative;
  flex: 0.15;
  margin-top: 10px;

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
  border: none;
  background: transparent;
  color: #fff;
  outline: none;
  margin-bottom: 20px;
`;

export const Option = styled.option``;
