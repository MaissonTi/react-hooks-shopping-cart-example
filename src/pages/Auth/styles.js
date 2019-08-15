import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  input {
    flex: 1;
    border: 1px solid ${props => (props.error ? '#ff6b6b' : '#eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    transition: border 0.25s ease-out;
    color: black;
    width: 500px;
    margin: 5px auto;
  }

  div {
    color: red;
    background-color: #000;
    height: 20px;
    text-align: center;
    font-size: 17px;
    margin: 10px;
    vertical-align: middle;
  }
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button`
  background: #e62429;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  margin: 5px auto;

  span {
    ${props =>
      props.loading &&
      css`
        svg {
          animation: ${rotate} 2s linear infinite;
        }
      `}
  }
`;
