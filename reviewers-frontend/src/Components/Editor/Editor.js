import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';
import styled from 'styled-components';
import ReviewEditor from '../ReviewEditor';

const CLASS_NAME = {
  REVIEW_BTN: 'review-btn',
  REVIEW_COUNT: 'review-count'
}

const StyledWrapper = styled.section`
  height: ${props => props.height}px;
  border: solid 1px #c2c2c2;

  .${CLASS_NAME.REVIEW_BTN} {
    border-radius: 10px;
    background: skyblue;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .${CLASS_NAME.REVIEW_COUNT} {
    width: 5px;
    height: 5px;
    left: 0;
    background: red;
  }
`;

class Editor extends Component {
  monacoEditor = null;
  monacoAPI = null;

  prevReviewDecos = {
    lines: [],
    ids: []
  }

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
      <StyledWrapper>
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
      </StyledWrapper>
    );
  }

  componentDidMount() {
    const { reviewCounts } = this.props;
    const { prevReviewDecos } = this;
    if (Object.keys(prevReviewDecos).every(k => prevReviewDecos[k].length !== 0)) {
      prevReviewDecos.lines = Object.keys(reviewCounts);
      prevReviewDecos.ids = this._updateReviewCount([], )
      // prevReviewDecos.positions = 
      // prevReviewDecos.ids = this._updateReviewCount(pr)
    }

    prevReviewDecos.ids = this._updateReviewCount(
      prevReviewDecos.ids,
      prevReviewDecos.lines
    )

    prevReviewDecos.lines = 
    console.log('parent component did mount', this.props.reviewCounts);
  }

  componentDidUpdate() {
    console.log('parent component did update', this.props.reviewCounts)
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

          const reviewContainerDOM = document.createElement('div');
          reviewContainerDOM.style.zIndex = 99999;

          currViewZoneId = changeAccessor.addZone({
              afterLineNumber: currLineNumber,
              heightInPx: 250,
              domNode: reviewContainerDOM,
          });

          viewZoneIds.push(currViewZoneId);
          activeLineNumbers.push(currLineNumber);

          ReactDOM.render(
            <ReviewEditor
              editor={monacoEditor}
              onCancelClick={() => {
                monacoEditor.changeViewZones(changeAccessor => changeAccessor.removeZone(currViewZoneId));
                activeLineNumbers = activeLineNumbers.filter(n => n !== currLineNumber);
                ReactDOM.unmountComponentAtNode(reviewContainerDOM);
              }}>
            </ReviewEditor>,
            reviewContainerDOM
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

  _updateReviewCount(prevDecoIds, lines) {
    const { monacoAPI, monacoEditor } = this;
    const options = {
      glyphMarginClassName: CLASS_NAME.REVIEW_COUNT
    };
    const decoOptions = lines.map(l => {
      return {
        range: new monacoAPI.Range(l, 1, l, 1),
        options
      }
    })

    return monacoEditor.deltaDecorations(prevDecoIds, decoOptions);
  }
}

Editor.defaultProps = {
    onChange: _=>{},
    language: 'javascript',
    onLineClick: _=>{},
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