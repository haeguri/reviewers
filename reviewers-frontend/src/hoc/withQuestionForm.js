import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import QuestionForm from '../components/QuestionForm';
import { useAuth } from '../contexts/auth';

const withQuestionForm = (WrappedComponent) => {
  const QuestionFormContainer = class extends Component {
    state = {
      languageOptions: [],
      selectedLanguageOption: '',
      form: {
        author: '',
        title: '',
        body: '',
        sourceCode: '',
        language: ''
      }
    }

    componentDidMount = () => {
      this.setState({
        form: {
          ...this.state.form,
          // TEMP!
          author: this.props.authInfo._id || '5c1a22620157ed1fabef733d',
        }
      })
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
      // debugger;
      console.log(this);
      return (
        <WrappedComponent>
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
        </WrappedComponent>
      )
    }
  }

  return withRouter(useAuth(QuestionFormContainer));
}

export default withQuestionForm;