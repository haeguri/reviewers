import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';
import Review from './Review/Review.js';
import styled from 'styled-components';

const REVIEW_COMMENT_HEIGHT = 200;

const StyledWrapper = styled.div`
    border: solid 1px #c2c2c2;
`;

class Editor extends Component {
    eidtor = null;
    monaco = null;

    constructor(props) {
        super(props);

        Object.assign(props.options, { 
            contextmenu: false,
            folding: false,
        });
    }

    render() {
        return (
            <StyledWrapper>
                <MonacoEditor
                    theme="vs"
                    width={this.props.width}
                    height={this.props.height}
                    language={this.props.language}
                    value={this.props.value}
                    options={this.props.options}
                    onChange={(newValue, e) => this.props.onChange(newValue, e)}
                    editorDidMount={(editor, monaco) => this._editorDidMount(editor, monaco)}
                />
            </StyledWrapper>
        )
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

            if(activeLineNumbers.indexOf(currLineNumber) >= 0) {
                return;
            }

            if(e.target.element.className.indexOf('comment-btn') >= 0) {

                editor.changeViewZones(changeAccessor => {
                    let currViewZoneId;

                    const reviewContainerDOM = document.createElement('div');
                    reviewContainerDOM.style.zIndex = '9999';

                    ReactDOM.render(
                        <Review
                            height={REVIEW_COMMENT_HEIGHT}
                            onCancelClick={() => {
                                editor.changeViewZones(changeAccessor => changeAccessor.removeZone(currViewZoneId));
                                activeLineNumbers = activeLineNumbers.filter(n => n !== currLineNumber);
                                ReactDOM.unmountComponentAtNode(reviewContainerDOM);
                            }}>
                        </Review>,
                        reviewContainerDOM
                    );

                    currViewZoneId = changeAccessor.addZone({
                        afterLineNumber: currLineNumber,
                        heightInPx: REVIEW_COMMENT_HEIGHT,
                        domNode: reviewContainerDOM,
                    })

                    viewZoneIds.push(currViewZoneId);
                    activeLineNumbers.push(currLineNumber);
                });
            }
        })
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
                    glyphMarginClassName: 'comment-btn',
                }
            }
        ]);
    }
}

Editor.defaultProps = {
    editorDidMount: _=>{},
    onChange: _=>{},
    language: 'javascript',
    width: '600',
    height: '600',
};

Editor.propTypes = {
    language: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.object,
    editorDidMount: PropTypes.func,
    onChange: PropTypes.func,
};

export default Editor;