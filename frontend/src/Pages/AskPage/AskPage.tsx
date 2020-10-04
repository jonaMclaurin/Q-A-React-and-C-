// eslint-disable-next-line
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  AppState,
  clearPostedQuestionActionCreator,
  postQuestionActionCreator,
} from '../../redux/Store';
import { AnyAction } from 'redux';

import { Page } from '../../Components/Page/Page';
import {
  Form,
  required,
  minLength,
  Values,
  SubmitResult,
} from '../../Components/Form/Form';
import { Field } from '../../Components/Field/Field';
import {
  postQuestion,
  PostQuestionData,
  QuestionData,
} from '../../Data/QuestionsData';

interface Props {
  postQuestion: (question: PostQuestionData) => Promise<void>;
  postedQuestionResult?: QuestionData;
  clearPostedQuestion: () => void;
}

const AskPage: FC<Props> = ({
  postQuestion,
  postedQuestionResult,
  clearPostedQuestion,
}) => {
  useEffect(() => {
    return function cleanUp() {
      clearPostedQuestion();
    };
  }, [clearPostedQuestion]);
  const handleSubmit = (values: Values) => {
    postQuestion({
      title: values.title,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });
  };

  let submitResult: SubmitResult | undefined;
  if (postedQuestionResult) {
    submitResult = { success: postedQuestionResult !== undefined };
  }

  return (
    <Page title="Ask a question">
      <Form
        submitCaption="Submit Your Question"
        validationRules={{
          title: [{ validator: required }, { validator: minLength, arg: 10 }],
          content: [{ validator: required }, { validator: minLength, arg: 50 }],
        }}
        onSubmit={handleSubmit}
        submitResult={submitResult}
        failureMessage="There was a problem with your question"
        successMessage="Your question was successfully submitted"
      >
        <Field name="title" label="Title" />
        <Field name="content" label="Content" type="TextArea" />
      </Form>
    </Page>
  );
};

const mapStateToProps = (store: AppState) => {
  return {
    postedQuestionResult: store.questions.postedResult,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    postQuestion: (question: PostQuestionData) =>
      dispatch(postQuestionActionCreator(question)),
    clearPostedQuestion: () => dispatch(clearPostedQuestionActionCreator()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AskPage);
