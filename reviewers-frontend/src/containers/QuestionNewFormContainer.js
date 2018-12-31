import React from 'react';
import questionAPI from '../api/question';
import withQuestionFormContainer from '../hoc/withQuestionFormContainer';
import QuestionForm from '../components/QuestionForm';

const QuestionNewFormContainer = (props) => (
  <QuestionForm 
    formTitle="새로운 질문"
    submitBtnTxt="등록하기"
    {...props}
  />
)

export default withQuestionFormContainer(
  QuestionNewFormContainer,
  questionAPI.newQuestion
);