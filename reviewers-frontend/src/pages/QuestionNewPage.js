import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import QuestionNewFormContainer from '../containers/QuestionNewFormContainer';

const QuestioNewPage = (props) => (
  <PageTemplate width={1200}>
    <QuestionNewFormContainer />
  </PageTemplate>
);

export default QuestioNewPage;