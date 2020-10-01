/** @jsx jsx */
import { css, jsx } from '@emotion/core';
// eslint-disable-next-line
import React, { useEffect, useState } from 'react';

import { PrimaryButton } from '../../Styles/Styles';
import { QuestionList } from '../QuestionList/QuestionList';
import { getUnansweredQuestions, QuestionData } from '../../Data/QuestionsData';
import { Page } from '../../Components/Page/Page';
import { PageTitle } from '../../Components/Page/PageTitle';

export const HomePage = () => {
  const [questions, setQuestions] = useState<QuestionData[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };
    doGetUnansweredQuestions();
  }, []);

  const handleAskQuestion = () => {
    console.log('TODO - move to the AskPage');
  };
  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <PageTitle> Unanswered Questions </PageTitle>
        <PrimaryButton onClick={handleAskQuestion}>
          Ask a Question
        </PrimaryButton>
      </div>
      {questionsLoading ? (
        <div
          css={css`
            font-size: 16px;
            font-style: italic;
          `}
        >
          Loading...
        </div>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  );
};
