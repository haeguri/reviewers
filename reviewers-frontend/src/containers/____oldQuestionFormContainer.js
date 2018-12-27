import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import languageAPI from '../api/language';
import questionAPI from '../api/question';
import { useAuth } from '../contexts/auth';
import QuestionForm from '../components/QuestionForm';

class QuestionFormContainer extends Component {
  state = {
    languageOptions: [],
    selectedLanguageOption: '',
    form: {
      author: '',
      title: '새로운 질문..',
      body: '# 테스트 입니다.',
      sourceCode: 'function test() { }',
      language: ''
    }
  }

  componentDidMount = async () =>  {
    const { data } = await languageAPI.getLanguages();

    this.setState({
      languageOptions: data,
      form: {
        ...this.state.form,
        // TEMP!!
        author: this.props.authInfo._id || '5c1a22620157ed1fabef733d',
        language: data[0]._id
      },
      selectedLanguageOption: data[0]
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

  onTitleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        title: e.target.value
      }
    })
  }

  onLangChange = (selectedItem) => {
    this.setState({
      selectedLanguageOption: selectedItem,
      form: {
        ...this.state.form,
        language: selectedItem._id,
      }
    });
  }

  onBodyChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        body: e.target.value
      }
    })
  }

  onCodeChange = (newValue) => {
    this.setState({
      form: {
        ...this.state.form,
        sourceCode: newValue
      }
    });
  }

  render = () => {
    return (
      <QuestionForm formTitle="새로운 질문"
                    submitBtnTxt="등록하기"
                    form={this.state.form}
                    selectedLanguageOption={this.state.selectedLanguageOption}
                    langOptions={this.state.languageOptions}
                    onTitleChange={this.onTitleChange}
                    onBodyChange={this.onBodyChange}
                    onLangChange={this.onLangChange}
                    onCodeChange={this.onCodeChange}
                    onSubmit={this.onSubmit}
      />
    )
  }
}

export default useAuth(withRouter(QuestionFormContainer));