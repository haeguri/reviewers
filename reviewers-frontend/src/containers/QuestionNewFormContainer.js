import React, { Component } from 'react';
import questionAPI from '../api/question';
import withQuestionFormContainer from '../hoc/withQuestionFormContainer';
import QuestionForm from '../components/QuestionForm';

class QuestionNewFormContainer extends Component {
  render = () => {
    return (
      <QuestionForm 
        formTitle="새로운 질문"
        submitBtnTxt="등록하기"
        {...this.props}
      />
    )
  }
}

export default withQuestionFormContainer(
  QuestionNewFormContainer,
  questionAPI.newQuestion
);