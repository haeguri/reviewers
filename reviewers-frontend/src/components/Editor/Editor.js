import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';
import styled from 'styled-components';
import ReviewEditor from '../ReviewEditor';

const CLASS_NAME = {
  REVIEW_BTN: 'icon review-btn',
  HAS_REVIEW: 'icon has-review'
}

const StyledSection = styled.section`
  height: ${props => props.height}px;
  border: solid 1px #c2c2c2;

  .icon::before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
  }

  .${CLASS_NAME.REVIEW_BTN.split(' ').join('.')}::before {
    font-weight: 900;
    content: "\f075";
    color: #1162bc;
    cursor: pointer;
    font-size: 15px;
    margin-left: 2px;
  }

  .${CLASS_NAME.HAS_REVIEW.split(' ').join('.')}::before {
    font-weight: 900; 
    content: "\f06a";
    color: #63092d;
    font-size: 14px;
    margin-left: 5px;
    cursor: pointer;
  }
`;

class Editor extends Component {
  monacoEditor = null;
  monacoAPI = null;

  prevReviewCountDecoIds = [];

  constructor(props) {
    super(props);

    const { options = {} } = props;

    Object.assign(options, { 
      contextmenu: false,
      folding: false,
      enable: false,
      lineDecorationsWidth: 20,
      minimap: {
        enabled: false
      }
    });
  }

  render() {
    return (
      <StyledSection>
        <MonacoEditor
          className={this.props.className}
          height={this.props.height}
          width={this.props.width}
          theme="vs"
          language={this.props.language}
          value={this.props.value}
          options={this.props.options}
          onChange={(newValue, e) => this.props.onChange(newValue, e)}
          editorDidMount={(editor, monaco) => this._editorDidMount(editor, monaco)}
        />
      </StyledSection>
    );
  }

  componentDidUpdate() {
    this._invokeUpdateReviewCount();
  }

  componentDidMount() {
    this._invokeUpdateReviewCount();

  }

  _invokeUpdateReviewCount() {
    const { reviewCounts } = this.props;
    let { prevReviewCountDecoIds } = this;

    let lines = Object.keys(reviewCounts).filter(c => c > 0).sort();

    this.prevReviewCountDecoIds = this._updateHasReviewIcon(prevReviewCountDecoIds, lines);
  }

  // child component componentDidMount
  _editorDidMount(editor, monaco) {
    const { isReadOnly } = this.props;

    this.monacoEditor = editor;
    this.monacoAPI = monaco;

    if (isReadOnly) {
      this._attachMouseDownEventListener();
      this._attachMouseMoveEventListener();
    } else {
      this.monacoEditor.focus();
    }
  }

  _attachMouseDownEventListener() {
    const { monacoEditor } = this;
    const { onLineClick } = this.props;
    let activeLineNumbers = [];
    const viewZoneIds = [];

    monacoEditor.onMouseDown(e => {
      if(e.target.position === null) {
          return;
      }

      let currLineNumber = e.target.position.lineNumber;

      onLineClick(currLineNumber);

      if(activeLineNumbers.indexOf(currLineNumber) >= 0) {
          return;
      }

      if(e.target.element.className.indexOf(CLASS_NAME.REVIEW_BTN) >= 0) {

        monacoEditor.changeViewZones(changeAccessor => {
          let currViewZoneId;

          const reviewDOM = document.createElement('div');
          reviewDOM.style.zIndex = 99999;

          currViewZoneId = changeAccessor.addZone({
              afterLineNumber: currLineNumber,
              heightInPx: 250,
              domNode: reviewDOM,
          });

          viewZoneIds.push(currViewZoneId);
          activeLineNumbers.push(currLineNumber);

          ReactDOM.render(
            <ReviewEditor
              editor={monacoEditor}
              onCancelClick={() => {
                monacoEditor.changeViewZones(changeAccessor => changeAccessor.removeZone(currViewZoneId));
                activeLineNumbers = activeLineNumbers.filter(n => n !== currLineNumber);
                ReactDOM.unmountComponentAtNode(reviewDOM);
              }}>
            </ReviewEditor>,
            reviewDOM
          );
        });
      }
    });
  }

  _attachMouseMoveEventListener() {
    const { monacoEditor } = this;
    let prevDecoIds;
    let prevLine;

    monacoEditor.onMouseMove(e => {
      if(e.target.position === null) {
        return;
      }

      let currLine = e.target.position.lineNumber;

      if(typeof prevLine === 'undefined') {
        prevLine = currLine
        prevDecoIds = this._updateReviewBtn([], prevLine);
        return;
      } else if(prevLine === currLine) {
        return;
      }

      prevDecoIds = this._updateReviewBtn(prevDecoIds, currLine);
      prevLine = currLine;
    });
  }

  _updateReviewBtn(prevDecoIds, line) {
    const { monacoAPI, monacoEditor } = this;

    return monacoEditor.deltaDecorations(prevDecoIds, [{
      range: new monacoAPI.Range(line, 1, line, 1),
      options: {
        linesDecorationsClassName: CLASS_NAME.REVIEW_BTN
      }
    }]);
  }

  _updateHasReviewIcon(prevDecoIds, lines) {
    const { monacoAPI, monacoEditor } = this;
    const decoOptions = lines.map(l => {
      return {
        range: new monacoAPI.Range(l, 1, l, 1),
        options: {
          glyphMarginClassName: CLASS_NAME.HAS_REVIEW
        }
      }
    })

    return monacoEditor.deltaDecorations(prevDecoIds, decoOptions);
  }
}

Editor.defaultProps = {
    onChange: _=>{},
    language: 'javascript',
    onLineClick: _=>{},
    reviewCounts: {}
};

Editor.propTypes = {
    language: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    value: PropTypes.string,
    options: PropTypes.object,
    onChange: PropTypes.func,
    onLineClick: PropTypes.func,
    reviewCounts: PropTypes.objectOf(PropTypes.number),
};

export default Editor;