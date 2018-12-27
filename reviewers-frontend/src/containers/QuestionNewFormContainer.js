import React, { Component } from 'react';
import questionAPI from '../api/question';
import languageAPI from '../api/language';
import withQuestionForm from '../hoc/withQuestionForm';

class QuestionNewContainer extends Component {
  componentDidMount = async () =>  {
    const { data: langData } = await languageAPI.getLanguages();
    const { state: form } = this;

    this.setState({
      languageOptions: langData,
      form: {
        ...form,
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
    const { children } = this.props;
    return (
      {children}
    )
  }
}

export default withQuestionForm(QuestionNewContainer);