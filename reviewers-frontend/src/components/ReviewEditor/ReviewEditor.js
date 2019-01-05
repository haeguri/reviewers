import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';
import MarkdownEditor from '../MarkdownEditor';
import InputError from '../InputError';

const StyledForm = styled.form`
  height: 100%;
  padding: 15px;
  border: solid 1px #c2c2c2;

  .markdown-editor {
    height: 200px;
    margin-bottom: 10px;
  }

  .footer {
    padding-top: 10px;
  }

  button.primary {
    margin-right: 5px;
  }
`;

class ReviewEditor extends Component {
  constructor(props) {
    super(props);

    this.mdEditorRef = React.createRef();
  }

  _mouseEnterOnMdEditor = () => {
    this.props.monacoEditor.updateOptions({
      scrollbar: {
        vertical: 'hidden',
        handleMouseWheel: false
      }
    });
  }

  _mouseEnterOnReviewEditor = () => {
    this.props.setIsMousePositionInReview(true);
  }

  _mouseLeaveOnMdEditor = () => {
    this.props.monacoEditor.updateOptions({
      scrollbar: {
        vertical: 'visible',
        handleMouseWheel: true
      }
    });
  }
  
  _mouseLeaveOnReviewEditor = () => {
    this.props.setIsMousePositionInReview(false);
  }

  componentDidMount = () => {
    const { reviewEditorRef } = this;
    const { mdEditorDOM } = this.mdEditorRef.current;
    mdEditorDOM.addEventListener('mouseenter', this._mouseEnterOnMdEditor);
    mdEditorDOM.addEventListener('mouseleave', this._mouseLeaveOnMdEditor);
    reviewEditorRef.addEventListener('mouseenter', this._mouseEnterOnReviewEditor);
    reviewEditorRef.addEventListener('mouseleave', this._mouseLeaveOnReviewEditor);
  }

  componentWillUnmount = () => {
    const { reviewEditorRef } = this;
    const { mdEditorDOM } = this.mdEditorRef.current;
    mdEditorDOM.removeEventListener('mouseenter', this._mouseEnterOnMdEditor);
    mdEditorDOM.removeEventListener('mouseleave', this._mouseLeaveOnMdEditor);
    reviewEditorRef.removeEventListener('mouseenter', this._mouseEnterOnReviewEditor);
    reviewEditorRef.removeEventListener('mouseleave', this._mouseLeaveOnReviewEditor);
    this.props.setIsMousePositionInReview(false);
  }

  render() {
    const {
      errors,
      value,
      onSaveClick, 
      onCancelClick, 
      onTextChange 
    } = this.props;
    
    return (
      <StyledForm innerRef={ref => this.reviewEditorRef = ref} error={errors.body}>
        <MarkdownEditor 
          className="markdown-editor"
          ref={this.mdEditorRef}
          value={value}
          onTextChange={onTextChange}
          error={errors.body}
        />
        <div className="footer">
          <Button type="submit" className="primary" onClick={onSaveClick}>리뷰 등록</Button>
          <Button type="cancel" onClick={onCancelClick}>취소</Button>
        </div>
      </StyledForm>
    );
  }
}

ReviewEditor.propTypes = {
  editor: PropTypes.object,
  height: PropTypes.number,
  width: PropTypes.number,
  onCancelClick: PropTypes.func
};

export default ReviewEditor;