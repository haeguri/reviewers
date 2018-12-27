import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import QuestionFormContainer from '../containers/QuestionFormContainer';

const QuestioNewPage = (props) => (
  <PageTemplate width={1200}>
    <QuestionFormContainer />
  </PageTemplate>
);

export default QuestioNewPage;