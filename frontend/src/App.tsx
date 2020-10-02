/** @jsx jsx */
import { css, jsx } from '@emotion/core';
// eslint-disable-next-line
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { HeaderWithRouter as Header } from './Components/Header/Header';
import { HomePage } from './Components/HomePage/HomePage';
import { fontFamily, fontSize, gray2 } from './Styles/Styles';
import { SearchPage } from './Pages/SearchPage/SearchPage';
import { SignInPage } from './Pages/SignInPage/SignInPage';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage';
import { QuestionPage } from './Pages/QuestionPage/QuestionPage';

const AskPage = lazy(() => import('./Pages/AskPage/AskPage'));

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
          <Route path="/ask">
            <Suspense
              fallback={
                <div
                  css={css`
                    margin-top: 100px;
                    text-align: center;
                  `}
                >
                  Loading...
                </div>
              }
            >
              <AskPage />
            </Suspense>
          </Route>
          <Route path="/signin" component={SignInPage} />
          <Route path="/questions/:questionId" component={QuestionPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
