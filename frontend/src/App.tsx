/** @jsx jsx */
import { css, jsx } from '@emotion/core';
// eslint-disable-next-line
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Header } from './Components/Header/Header';
import { HomePage } from './Components/HomePage/HomePage';
import { fontFamily, fontSize, gray2 } from './Styles/Styles';
import { AskPage } from './Pages/AskPage/AskPage';
import { SearchPage } from './Pages/SearchPage/SearchPage';
import { SignInPage } from './Pages/SignInPage/SignInPage';

function App() {
  return (
    <BrowserRouter>
      <div
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          color: ${gray2};
        `}
      >
        <Header />
        <HomePage />
      </div>
    </BrowserRouter>
  );
}

export default App;
