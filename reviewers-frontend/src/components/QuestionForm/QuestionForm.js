import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Editor from '../../components/Editor';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import Dropdown from '../../components/Dropdown';
import MarkdownEditor from '../../components/MarkdownEditor';

const StyledSection = styled.section`
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
`

const QuestionForm = props => {
  const { formTitle, submitBtnTxt, langOptions,
          onTitleChange, onBodyChange, onLangChange, onCodeChange,
          form } = props;
  return (
    <StyledSection>
      <section className="title-area">
        <h2>{formTitle}</h2>
        <div className="button-area">
          <Button className="filled primary">{submitBtnTxt}</Button>
        </div>
      </section>
      <section className="form">
        <section className="left">
          <div className="input-group">
            <label>제목</label>
            <TextInput 
              className="input-title"
              onChange={onTitleChange}
            />
          </div>
          <div className="input-group">
            <label>본문</label>
            <MarkdownEditor 
              className="md-editor" 
              value={form.body}
              onTextChange={onBodyChange}
            />
          </div>
        </section>
        <section className="right">
          <div className="input-group">
            <label className="inline">프로그래밍 언어</label>
            <Dropdown 
              options={langOptions}
              value={form.language}
              onChange={onLangChange}
            />
          </div>
          <div className="input-group">
            <label>소스코드</label>
            <Editor 
              height={450}
              value={form.code}
              onChange={(newValue, e) => onCodeChange(newValue, e)}
            />
          </div>
        </section>
      </section>
    </StyledSection>
  )
}

QuestionForm.propTypes = {
  formTitle: PropTypes.string,
  submitBtnTxt: PropTypes.string,
  langOptions: PropTypes.array,
  form: PropTypes.object,
  onTitleChange: PropTypes.func,
  onBodyChange: PropTypes.func,
  onLangChange: PropTypes.func,
  onCodeChange: PropTypes.func,
};

export default QuestionForm;