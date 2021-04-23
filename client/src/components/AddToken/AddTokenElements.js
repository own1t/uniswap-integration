import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 90%;
  height: 350px;
  margin: 30px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
`;

export const FormHeader = styled.div`
  /* border: 1px solid red; */

  margin: 30px;
  color: #ff6bb2;
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
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  margin-top: 50px;
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

  flex: 0.84;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  > h3 {
    font-size: 1.8em;
    z-index: 1;
    color: #fff;
    margin: 0;
  }

  > .MuiSvgIcon-root {
    color: #fff;
    font-size: 2.25rem;
    margin-right: 10px;
    cursor: pointer;
  }
`;

export const InputLabel = styled.div`
  /* border: 1px solid red; */

  position: relative;
  flex: 0.3;
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
    border-radius: 5px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-right: 2px solid rgba(255, 255, 255, 0.2);
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    letter-spacing: 1px;
    color: #fff;
  }
`;
