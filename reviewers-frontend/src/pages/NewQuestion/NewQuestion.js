import React, { Component } from 'react';
import Editor from '../../components/Editor';
import styled from 'styled-components';
import PageContainer from '../../containers/PageContainer';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import Dropdown from '../../components/Dropdown';
import { getSampleCode, getSampleMarkdown } from '../../utils/test-utils';
import MarkdownEditor from '../../components/MarkdownEditor';

const StyledPageContainer = styled(PageContainer)`
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
    height: 300px;
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
        language: selectedItem
      }
    });
  }

  onBodyChange = e => {
    this.setState({
      form: {
        body: e.target.value
      }
    })
  }

  onCodeChange = (newValue, e) => {
    this.setState({
      code: newValue
    });

    console.log('write editor on change', newValue, e);
  }

  render() {
    return (
      <StyledPageContainer
        width={1200}>
        <section className="form">
          <section className="left">
            <div className="input-group">
              <label className="inline">프로그래밍 언어</label>
              <Dropdown 
                options={testLanguageOptions}
                onChange={this.onDropdownChange}
              />
            </div>
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
              <label>소스코드</label>
              <Editor 
                // width={50}
                height={400}
                value={this.state.code}
                onChange={(newValue, e) => this.onCodeChange(newValue, e)}
              />
            </div>
          </section>
        </section>
        <section>
          <Button>저장</Button>
          <Button>취소</Button>
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