import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';
import styled from 'styled-components';
import ReviewEditor from '../ReviewEditor';

const StyledWrapper = styled.section`
  height: ${props => props.height}px;
  border: solid 1px #c2c2c2;

  .comment-btn {
    border-radius: 10px;
    background: skyblue;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .myLineDecoration {
    background: lightblue;
    width: 100% !important;
    left: 3px;
  }
`;

class Editor extends Component {
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

  _editorDidMount(editor, monaco) {
    if(this.props.isReadOnly) {
      this._attachMouseDownEventListener(editor);
      this._attachMouseMoveEventListener(editor, monaco);
    } else {
      editor.focus();
    }

    this.props.editorDidMount(editor, monaco);
  }

  _attachMouseDownEventListener(editor) {
    let activeLineNumbers = [];
    const viewZoneIds = [];

    editor.onMouseDown(e => {
      if(e.target.position === null) {
          return;
      }

      let currLineNumber = e.target.position.lineNumber;

      this.props.onLineClick(currLineNumber);

      if(activeLineNumbers.indexOf(currLineNumber) >= 0) {
          return;
      }

      if(e.target.element.className.indexOf('comment-btn') >= 0) {

        editor.changeViewZones(changeAccessor => {
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
              editor={editor}
              onCancelClick={() => {
                editor.changeViewZones(changeAccessor => changeAccessor.removeZone(currViewZoneId));
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

  _attachMouseMoveEventListener(editor, monaco) {
    let prevPosition;
    let prevDecoIds;

    editor.onMouseMove(e => {
      if(e.target.position === null) {
        return;
      }

      let currPosition = e.target.position;

      if(typeof prevPosition === 'undefined') {
        prevPosition = currPosition;
        prevDecoIds = this._updateDecorations(editor, monaco, [], currPosition);
        return;
      } else if(prevPosition.lineNumber === currPosition.lineNumber) {
        return;
      }

      prevDecoIds = this._updateDecorations(editor, monaco, prevDecoIds, currPosition);
      prevPosition = currPosition;
    });
  }

  _updateDecorations(editor, monaco, prevDecoIds, currPosition) {
    return editor.deltaDecorations(prevDecoIds, [
      {
        range: new monaco.Range(
            currPosition.lineNumber, 1, 
            currPosition.lineNumber, 1
        ),
        options: { 
          isWholeLine: true, 
          marginlinesDecorationsClassName: 'comment-btn' 
        }
      }
    ]);
  }
}

Editor.defaultProps = {
    editorDidMount: _=>{},
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
    editorDidMount: PropTypes.func,
    onChange: PropTypes.func,
    onLineClick: PropTypes.func,
    reviewCounts: PropTypes.object,
};

export default Editor;