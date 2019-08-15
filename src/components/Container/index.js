import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 0px auto;
  background-color: #202020c2;
  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    svg {
      margin-right: 10px;
    }

    img {
      margin: 0 auto;
    }
  }

  p {
    margin-top: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      text-decoration: none;
      color: white;
      margin: 0px 10px;
      border-bottom: 1px solid;
      padding-bottom: 1px;
      transition: linear;
      &:hover {
        color: red;
      }
    }
  }
`;

export default Container;
