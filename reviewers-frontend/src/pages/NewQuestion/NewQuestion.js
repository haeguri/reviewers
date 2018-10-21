import React, { Component } from 'react';
import Editor from '../../components/Editor';
import styled from 'styled-components';
import PageTemplate from '../../templates/PageTemplate';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import Dropdown from '../../components/Dropdown';
import { getSampleCode, getSampleMarkdown } from '../../utils/test-utils';
import MarkdownEditor from '../../components/MarkdownEditor';

const StyledPageContainer = styled(PageTemplate)`
  .title-area {
    display: flex;
    align-items: center;
    border-bottom: solid 1px #c2c2c2;

    .button-area {
      margin-left: auto;
    }
  }

  .form {
    display: flex;
    flex-direction: row;
  }

  .left, .right {
    padding: 0 10px;
  }

  .left {
    width: 600px;
  }

  .right {
    background-color: #E8EBF0;
    border-left: solid 1px #d2d2d2;
    width: 600px;
  }

  .input-group {
    margin: 10px 0;
  }

  .md-editor {
    height: 460px;
  }
`;

const testLanguageOptions = [
  {label: 'JavaScript', value: 'javascript'},
  {label: 'C++',        value: 'c++'},
  {label: 'Java',       value: 'java'}
]

class NewQuestion extends Component {
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

  onDropdownChange = (selectedItem) => {
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

    console.log('write editor on change', newValue, e);
  }

  render() {
    return (
      <StyledPageContainer
        width={1200}>
        <section className="title-area">
          <h2>새로운 질문</h2>
          <div className="button-area">
            <Button className="filled primary">등록하기</Button>
          </div>
        </section>
        <section className="form">
          <section className="left">
            <div className="input-group">
              <label>제목</label>
              <TextInput 
                className="input-title"
              />
            </div>
            <div className="input-group">
              <label>본문</label>
              <MarkdownEditor 
                className="md-editor" 
                value={this.state.form.body}
                onTextChange={this.onBodyChange}
              />
            </div>
          </section>
          <section className="right">
            <div className="input-group">
              <label className="inline">프로그래밍 언어</label>
              <Dropdown 
                options={testLanguageOptions}
                value={this.state.form.language}
                onChange={this.onDropdownChange}
              />
            </div>
            <div className="input-group">
              <label>소스코드</label>
              <Editor 
                height={450}
                value={this.state.code}
                onChange={(newValue, e) => this.onCodeChange(newValue, e)}
              />
            </div>
          </section>
        </section>
      </StyledPageContainer>
    )
  }
}

NewQuestion.defaultProps = {

};

NewQuestion.propTypes = {

};



export default NewQuestion;