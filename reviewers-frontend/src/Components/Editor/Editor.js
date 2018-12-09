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
    console.log('origin component did mount', this.props.reviewCounts);
  }

  componentDidUpdate() {
    console.log('origin component did update', this.props.reviewCounts)
  }

  _editorDidMount(editor, monaco) {
    const { isReadOnly } = this.props;

    this.monacoEditor = editor;
    this.monacoAPI = monaco;

    if(isReadOnly) {
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
    let prevPosition;
    let prevDecoIds;

    monacoEditor.onMouseMove(e => {
      if(e.target.position === null) {
        return;
      }

      let currPosition = e.target.position;

      if(typeof prevPosition === 'undefined') {
        prevPosition = currPosition;
        prevDecoIds = this._updateDecorations([], currPosition);
        return;
      } else if(prevPosition.lineNumber === currPosition.lineNumber) {
        return;
      }

      prevDecoIds = this._updateDecorations(prevDecoIds, currPosition);
      prevPosition = currPosition;
    });
  }

  _updateDecorations(prevDecoIds, currPosition) {
    const { monacoEditor, monacoAPI } = this;
    return monacoEditor.deltaDecorations(prevDecoIds, [
      {
        range: new monacoAPI.Range(
            currPosition.lineNumber, 1, 
            currPosition.lineNumber, 1
        ),
        options: { 
          isWholeLine: true, 
          linesDecorationsClassName: CLASS_NAME.REVIEW_BTN,
          // glyphMarginClassName: CLASS_NAME.REVIEW_COUNT,
        }
      }
    ]);
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