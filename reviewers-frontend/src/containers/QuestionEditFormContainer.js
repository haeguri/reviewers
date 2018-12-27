import React, { Component } from 'react';
import languageAPI from '../api/language';
import questionAPI from '../api/question';
import withQuestionForm from '../hoc/withQuestionForm';

class QuestionEditContainer extends Component {
  componentDidMount = async () =>  {
    const { data: langData } = await languageAPI.getLanguages();

    const { match: { params } } = this.props
    const { 
      data: { 
        _id: questionId,
        title, 
        body, 
        soureCode, 
        language
      }
    } = await questionAPI.detailQuestion(params.qId);

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
    const { children } = this.props;
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  }
}

export default withQuestionForm(QuestionEditContainer);
