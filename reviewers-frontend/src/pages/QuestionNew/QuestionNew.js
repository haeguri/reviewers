import React, { Component } from 'react';
import PageTemplate from '../../templates/PageTemplate';
import QuestionForm from '../../components/QuestionForm';
import { getSampleCode, getSampleMarkdown } from '../../utils/test-utils';

const testLanguageOptions = [
  {label: 'JavaScript', value: 'javascript'},
  {label: 'C++',        value: 'c++'},
  {label: 'Java',       value: 'java'}
]

class QuestionNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        title: 'sample title',
        code: getSampleCode(),
        body: getSampleMarkdown(),
        language: testLanguageOptions[0].value
      }
    };
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
      <PageTemplate
        width={1200}>
        <QuestionForm 
          formTitle="새로운 질문"
          submitBtnTxt="등록하기"
          langOptions={testLanguageOptions}
          onTitleChange={this.onTitleChange}
          onBodyChange={this.onBodyChange}
          onLangChange={this.onLangChange}
          onCodeChange={this.onCodeChange}
          form={this.state.form}
        />
      </PageTemplate>
    )
  }
}

export default QuestionNew;