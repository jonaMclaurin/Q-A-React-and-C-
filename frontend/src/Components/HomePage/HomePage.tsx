/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

import { PrimaryButton } from '../../Styles/Styles';
import { QuestionList } from '../QuestionList/QuestionList';
import { getUnansweredQuestions } from '../../Data/QuestionsData';
import { Page } from '../../Components/Page/Page';
import { PageTitle } from '../../Components/Page/PageTitle';

export const HomePage = () => (
  <Page>
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <PageTitle> Unanswered Questions </PageTitle>
      <PrimaryButton> Ask a Question </PrimaryButton>
    </div>
    {/* <QuestionList data={getUnansweredQuestions()} /> */}
  </Page>
);
