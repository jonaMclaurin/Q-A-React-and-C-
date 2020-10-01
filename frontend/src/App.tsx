/** @jsx jsx */
import { css, jsx } from '@emotion/core';
// eslint-disable-next-line
import React from 'react';

import { Header } from './Components/Header/Header';
import { HomePage } from './Components/HomePage/HomePage';
import { fontFamily, fontSize, gray2 } from './Styles/Styles';

function App() {
  return (
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
  );
}

export default App;
