import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import QuestionEditFormContainer from '../containers/QuestionEditFormContainer';

const QuestionEditPage = (props) => (
  <PageTemplate width={1200}>
    <QuestionEditFormContainer />
  </PageTemplate>
);

export default QuestionEditPage;