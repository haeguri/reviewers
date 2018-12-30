import React, { Component } from 'react';
import questionAPI from '../api/question';
import languageAPI from '../api/language';
import withQuestionFormContainer from '../hoc/withQuestionFormContainer';
import QuestionForm from '../components/QuestionForm';

class QuestionNewFormContainer extends Component {
  componentDidMount = async () =>  {
    const { data: langData } = await languageAPI.getLanguages();
    const { state: form } = this;

    this.setState({
      languageOptions: langData,
      form: {
        questionId: '',
        title: '',
        body: '',
        sourceCode: '',
        language: langData[0]._id,
      },
      selectedLanguageOption: langData[0]
    });
  }

  onSubmit = async (e) => {
    try {
      const { data } = await questionAPI.newQuestion(this.state.form);
      this.props.history.push(`/question-detail/${data._id}`);
      
    } catch (err) {
      console.log('error', err);
    }

    e.preventDefault();
  }

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

export default withQuestionFormContainer(QuestionNewFormContainer);