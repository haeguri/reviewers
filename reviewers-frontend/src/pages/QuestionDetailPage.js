import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import QuestionDetailContainer from '../containers/QuestionDetailContainer';

const QuestionDetailPage = ({match: {params}}) => {
  return (
    <PageTemplate headerWidth={1150} width={1150}>
      <QuestionDetailContainer questionId={params.qId}/>
    </PageTemplate>
  )
}

export default QuestionDetailPage;