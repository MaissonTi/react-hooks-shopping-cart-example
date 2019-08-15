import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    min-height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased !important;
    background: url(https://i.annihil.us/u/prod/marvel/html_blocks_assets/loyalty/reg-bg.jpg) top center no-repeat #000;
  }
  body, input, button {
    color: #fff;
    font-size: 14px;
    font: 800 14px/1 Roboto Bold, Trebuchet MS, Helvetica, Arial, sans-serif;
  }
  button {
    cursor: pointer;
  }

  #root{
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 20px 50px;
  }
`;
