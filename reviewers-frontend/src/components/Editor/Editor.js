import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';
import { withRouter } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import { useReviewAPI } from '../../contexts/review';
import styled from 'styled-components';
import ReviewEditorContainer from '../../containers/ReviewEditorContainer';
import InputError from '../InputError';

const CLASS_NAME = {
  REVIEW_BTN: 'icon review-btn',
  HAS_REVIEW: 'icon has-review'
}

const StyledSection = styled.section`
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.error ? '#ff0000' : '#c2c2c2'};
  border-radius: 3px;
  overflow: hidden;

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
  state = {
    isMouseInReviewEditor: false
  }

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
      },
    });
  }

  componentDidMount() {
    this._invokeUpdateReviewCount();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.language !== prevProps.language) {
      const model = this.monacoEditor.getModel();
      this.monacoAPI.editor.setModelLanguage(model, this.props.language);
      return {};
    }

    this._invokeUpdateReviewCount();
  }

  render() {
    const {
      className,
      height,
      language,
      value,
      options,
      onChange,
      error
    } = this.props;

    return (
      <React.Fragment>
        <StyledSection error={error}>
          <MonacoEditor 
            className={className}
            height={height}
            theme="vs"
            language={language}
            value={value}
            options={options}
            onChange={(newValue, e) => onChange(newValue, e)}
            editorDidMount={(editor, monaco) => this._editorDidMount(editor, monaco)}
          />
        </StyledSection>
        <InputError error={error} />
      </React.Fragment>
    );
  }

  _invokeUpdateReviewCount() {
    const { reviewCounts } = this.props;
    let { prevReviewCountDecoIds } = this;

    let lines = Object.keys(reviewCounts).filter(c => c > 0).sort();

    this.prevReviewCountDecoIds = this._updateHasReviewIcon(prevReviewCountDecoIds, lines);
  }

  setIsMousePositionInReview = (v) => {
    this.setState({
      isMouseInReviewEditor: v
    });
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
    const { match: { params }, history, onLineClick, reviewActions } = this.props;

    const viewZoneIds = [];
    let activeLineNumbers = [];

    monacoEditor.onMouseDown(e => {
      if (e.target.position === null) {
        return;
      }

      if (this.state.isMouseInReviewEditor) {
        return;
      }

      let currLineNumber = e.target.position.lineNumber;


      onLineClick(currLineNumber);

      if (activeLineNumbers.indexOf(currLineNumber) >= 0) {
        return;
      }

      if(e.target.element.className.indexOf(CLASS_NAME.REVIEW_BTN) >= 0) {
        if (!this.props.authInfo.isLogin) {
          history.push('/login');
        }

        monacoEditor.changeViewZones(changeAccessor => {
          let currViewZoneId;

          const reviewDOM = document.createElement('div');
          reviewDOM.style.zIndex = 99999;

          currViewZoneId = changeAccessor.addZone({
              afterLineNumber: currLineNumber,
              heightInPx: 280,
              domNode: reviewDOM,
          });

          viewZoneIds.push(currViewZoneId);
          activeLineNumbers.push(currLineNumber);

          ReactDOM.render(
            <ReviewEditorContainer
              authInfo={this.props.authInfo}
              reviewActions={reviewActions}
              lineNumber={currLineNumber}
              questionId={params.qId}
              monacoEditor={monacoEditor}
              onCancelClick={() => {
                monacoEditor.changeViewZones(changeAccessor => changeAccessor.removeZone(currViewZoneId));
                activeLineNumbers = activeLineNumbers.filter(n => n !== currLineNumber);
                ReactDOM.unmountComponentAtNode(reviewDOM);
              }}
              setIsMousePositionInReview={this.setIsMousePositionInReview}>
            </ReviewEditorContainer>,
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

export default withRouter(useAuth(useReviewAPI(Editor)));