import React, { Component } from 'react';
import languageAPI from '../api/language';
import questionAPI from '../api/question';
import withQuestionFormContainer from '../hoc/withQuestionFormContainer';
import QuestionForm from '../components/QuestionForm';

class QuestionEditFormContainer extends Component {
  componentDidMount = async () =>  {
    const { data: langData } = await languageAPI.getLanguages();
    const { 
      data: { 
        _id: questionId,
        title, 
        body, 
        soureCode, 
        language
      }
    } = await questionAPI.detailQuestion('5c24f5b67e27b970f82529a6');

    this.setState({
      languageOptions: langData,
      form: {
        questionId,
        title,
        body,
        soureCode,
        language: language._id,
      },
      selectedLanguageOption: language
    });
  }

  onSubmit = async (e) => {
    try {
      const { data } = await questionAPI.updateQuestion(this.state.form);
      this.props.history.push(`/question-detail/${data._id}`);
      
    } catch (err) {
      console.log('error', err);
    }

    e.preventDefault();
  }

  render = () => {
    return (
      <QuestionForm 
        formTitle="질문 수정"
        submitBtnTxt="저장하기"
        {...this.props}
      />
    )
  }
}

export default withQuestionFormContainer(QuestionEditFormContainer);
