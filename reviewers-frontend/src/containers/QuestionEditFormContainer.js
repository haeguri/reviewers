import React from 'react';
import questionAPI from '../api/question';
import withQuestionFormContainer from '../hoc/withQuestionFormContainer';
import QuestionForm from '../components/QuestionForm';

const QuestionEditFormContainer = (props) => (
  <QuestionForm 
    formTitle="질문 수정"
    submitBtnTxt="저장하기"
    {...this.props}
  />
);

export default withQuestionFormContainer(
  QuestionEditFormContainer,
  questionAPI.updateQuestion,
  questionAPI.detailQuestion
);
