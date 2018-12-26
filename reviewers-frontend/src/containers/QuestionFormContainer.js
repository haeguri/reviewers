import React, { Component } from 'react';
import languageAPI from '../api/language';
import questionAPI from '../api/question';

import QuestionForm from '../components/QuestionForm';

class QuestionFormContainer extends Component {
  state = {
    languageOptions: [],
    form: {
      title: '',
      code: '',
      body: '',
      language: ''
    }
  }

  async componentDidMount() {
    const { data } = await languageAPI.getLanguages();

    this.setState({
      languageOptions: data.map(d => {
        return { name: d.name, value: d.name }
      })
    });
  }

  onTitleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        title: e.target.value
      }
    })
  }

  onLangChange = (selectedItem) => {
    this.setState({
      form: {
        ...this.state.form,
        language: selectedItem,
      }
    });
  }

  onBodyChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        body: e.target.value
      }
    })
  }

  onCodeChange = (newValue, e) => {
    this.setState({
      form: {
        ...this.state.form,
        code: newValue
      }
    });

    // console.log('write editor on change', newValue, e);
  }
  render() {
    return (
      <QuestionForm formTitle="새로운 질문"
                    submitBtnTxt="등록하기"
                    langOptions={this.state.languageOptions}
                    onTitleChange={this.onTitleChange}
                    onBodyChange={this.onBodyChange}
                    onLangChange={this.onLangChange}
                    onCodeChange={this.onCodeChange}
                    form={this.state.form}/>
    )
  }
}

export default QuestionFormContainer;