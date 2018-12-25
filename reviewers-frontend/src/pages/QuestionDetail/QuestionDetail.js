import React from 'react';
import PageTemplate from '../../templates/PageTemplate';
import QuestionDetailContainer from '../../containers/QuestionDetail';

const QuestionDetailPage = props => {
  return (
    <PageTemplate headerWidth={1150} width={1150}>
      <QuestionDetailContainer />
    </PageTemplate>
  )
}

export default QuestionDetailPage;