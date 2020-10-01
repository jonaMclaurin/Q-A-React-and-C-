/** @jsx jsx */
import { css, jsx } from '@emotion/core';
// eslint-disable-next-line
import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Header } from './Components/Header/Header';
import { HomePage } from './Components/HomePage/HomePage';
import { fontFamily, fontSize, gray2 } from './Styles/Styles';
import { AskPage } from './Pages/AskPage/AskPage';
import { SearchPage } from './Pages/SearchPage/SearchPage';
import { SignInPage } from './Pages/SignInPage/SignInPage';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage';
import { QuestionPage } from './Pages/QuestionPage/QuestionPage';

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
        <Switch>
          <Redirect from="/home" to="/" />
          <Route exact path="/" component={HomePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/ask" component={AskPage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/questions/:questionId" component={QuestionPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
