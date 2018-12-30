import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';
import MarkdownEditor from '../MarkdownEditor';
import { getSampleMarkdown } from '../../utils/test-utils';

const StyledDiv = styled.div`
  height: 100%;
  padding: 15px;
  border: solid 1px #c2c2c2;

  .markdown-editor {
    height: 186px;
  }

  .footer {
    padding-top: 10px;
  }

  button.primary {
    margin-right: 5px;
  }
`;

class ReviewEditor extends Component {
  state = {
    input: getSampleMarkdown()
  }

  constructor(props) {
    super(props);

    this.mdEditorRef = React.createRef();

    this._mouseEnterEventListener = this._mouseEnterEventListener.bind(this);
    this._mouseLeaveEventListener = this._mouseLeaveEventListener.bind(this);
  }

  _mouseEnterEventListener() {
    console.log('disable scroll');
    this.props.editor.updateOptions({
      scrollbar: {
        vertical: 'hidden',
        handleMouseWheel: false
      }
    })
  }

  _mouseLeaveEventListener() {
    console.log('enable scroll');
    this.props.editor.updateOptions({
      scrollbar: {
        vertical: 'visible',
        handleMouseWheel: true
      }
    })
  }

  componentDidMount() {
    const { mdEditorDOM } = this.mdEditorRef.current;
    mdEditorDOM.addEventListener('mouseenter', this._mouseEnterEventListener);
    mdEditorDOM.addEventListener('mouseleave', this._mouseLeaveEventListener);
  }

  componentWillUnmount() {
    const { mdEditorDOM } = this.mdEditorRef.current;
    mdEditorDOM.removeEventListener('mouseenter', this._mouseEnterEventListener);
    mdEditorDOM.removeEventListener('mouseleave', this._mouseLeaveEventListener);
  }

  onTextChange(e) {
    const { target: { value: input }} = e;
    this.setState({ input });
    // e.stopPropagation();
  }

  onSaveClick() {

  }

  render() {
    return (
      <StyledDiv>
        <MarkdownEditor className="markdown-editor"
                        ref={this.mdEditorRef}
                        value={this.state.input}
                        onTextChange={(e) => this.onTextChange(e)} 
        />
        <div className="footer">
          <Button className="primary" 
                  type="button" onClick={() => this.onSaveClick()}>리뷰 등록</Button>
          <Button type="button" onClick={() => this.props.onCancelClick()}>취소</Button>
        </div>
      </StyledDiv>
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