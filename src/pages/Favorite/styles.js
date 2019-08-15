import styled, { keyframes } from 'styled-components';

export const ComicList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background: #202020;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
      max-width: 250px;
      height: 370px;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #fff;
      margin-top: 5px;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 5px 0 20px;
      > span {
        font-size: 21px;
        font-weight: bold;
      }
    }
  }
`;

export const Star = styled.div`
  svg {
    color: #f9ff00;
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

export const Loading = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0 auto;
  display: flex;
  justify-content: center;
  padding: 100px;
  background: #000000a1;
  left: 0;
  top: 0;
  align-items: center;
  z-index: 9999;
  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

export const Button = styled.a.attrs(props => ({
  disabled: props.loading,
}))`
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  position: relative;
  letter-spacing: 0;
  overflow: hidden;
  margin-top: auto;
  z-index: 9998;

  &:hover::before,
  &:hover::after,
  &:hover div:after,
  &:hover div:before {
    opacity: 0.4;
    transform: translate3D(0);
  }

  &:hover > div {
    border-left: 1px solid #797979;
    border-right: 1px solid #797979;
    transform: translate3D(0);
  }

  &:before,
  &:after {
    border-color: #fff;
    -webkit-transition: none;
    height: 15px;
    position: relative;
    border-style: solid;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    content: '';
    display: block;
  }

  &:after {
    margin-right: 16px;
    border-width: 0 0 1px 1px;
  }

  &:before {
    border-width: 1px 1px 0 0;
    margin-left: 16px;
  }

  > div {
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    -webkit-transition: none;
    transition: none;
    line-height: 16px;
    padding: 0px 35px;
    display: flex;
    justify-content: end;

    &:before,
    &:after {
      border-style: solid;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      content: '';
      display: block;
      border-color: transparent;
      border-width: 0 0 16px 16px;
      position: absolute;
    }

    &:before {
      left: 0;
      top: 0;
      background-size: 16px 24px;
      background-image: repeating-linear-gradient(
        -45deg,
        #fff,
        #fff 1px,
        transparent 0,
        transparent 16px
      );
      -webkit-transition: none;
      transition: none;
    }

    &:after {
      bottom: 0;
      right: 0;
      background-size: 16px 24px;
      background-image: repeating-linear-gradient(
        -46deg,
        #fff,
        #fff 1px,
        transparent 0,
        transparent 16px
      );
      -webkit-transition: none;
      transition: none;
    }

    span {
      margin-left: 35px;
    }
  }
`;
