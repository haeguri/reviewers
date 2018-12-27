import React, { Component } from 'react';
import languageAPI from '../api/language';
import questionAPI from '../api/question';

import QuestionForm from '../components/QuestionForm';

class QuestionFormContainer extends Component {
  state = {
    languageOptions: [],
    form: {
      title: '',
      body: '',
      sourceCode: '',
      language: ''
    }
  }

  async componentDidMount() {
    const { data } = await languageAPI.getLanguages();

    console.log(data);
    this.setState({
      languageOptions: data.map(d => {
        return { label: d.name, value: d.name }
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

  onSubmit = (e) => {
    e.preventDefault();
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
                    onSubmit={this.onSubmit}
                    form={this.state.form}/>
    )
  }
}

export default QuestionFormContainer;