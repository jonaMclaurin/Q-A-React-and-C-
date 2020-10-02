// eslint-disable-next-line
import React from 'react';
import { Page } from '../../Components/Page/Page';
import { Form } from '../../Components/Form/Form';
import { Field } from '../../Components/Field/Field';

export const AskPage = () => {
  return (
    <Page title="Ask a question">
      <Form submitCaption="Submit Your Question">
        <Field name="title" label="Title" />
        <Field name="content" label="Content" type="TextArea" />
      </Form>
    </Page>
  );
};

export default AskPage;
