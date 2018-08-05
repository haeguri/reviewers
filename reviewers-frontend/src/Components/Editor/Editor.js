import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import MonacoEditor from 'react-monaco-editor';
import Review from './Review/Review.js';
import './Editor.css';

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
        )
    }

    _editorDidMount(editor, monaco) {
        this.editor = editor;
        this.monaco = monaco;

        if(this.props.isReadOnly) {
            this._attachMouseDownEventListener();
            this._attachMouseMoveEventListener();
        } else {
            this.editor.focus();
        }

        this.props.editorDidMount(editor, monaco);
    }

    _attachMouseDownEventListener() {
        let activeLineNumbers = [];
        const viewZoneIds = [];

        this.editor.onMouseDown(e => {
            if(e.target.position === null) {
                return;
            }

            let currLineNumber = e.target.position.lineNumber;

            if(activeLineNumbers.indexOf(currLineNumber) >= 0) {
                return;
            }

            const REVIEW_COMMENT_HEIGHT = 200;

            if(e.target.element.className.indexOf('comment-btn') >= 0) {
                const { editor } = this;

                editor.changeViewZones(changeAccessor => {
                    let currViewZoneId;

                    const reviewContainerDOM = document.createElement('div');
                    reviewContainerDOM.style.zIndex = '9999';
                    ReactDOM.render(
                        <Review
                            onCancelClick={() => {
                                editor.changeViewZones(changeAccessor => changeAccessor.removeZone(currViewZoneId));
                                activeLineNumbers = activeLineNumbers.filter(n => n !== currLineNumber);
                            }}>
                        </Review>,
                        reviewContainerDOM
                    );

                    currViewZoneId = changeAccessor.addZone({
                        afterLineNumber: currLineNumber,
                        afterColumn: 1,
                        heightInPx: REVIEW_COMMENT_HEIGHT,
                        domNode: reviewContainerDOM,
                    })

                    viewZoneIds.push(currViewZoneId);
                    activeLineNumbers.push(currLineNumber);
                });
            }
        })
    }

    _attachMouseMoveEventListener() {
        let prevPosition;
        let prevDecoIds;

        this.editor.onMouseMove(e => {
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
        })
    }

    _updateDecorations(prevDecoIds, currPosition) {
        return this.editor.deltaDecorations(prevDecoIds, [
            {
                range: new this.monaco.Range(
                    currPosition.lineNumber, currPosition.column, 
                    currPosition.lineNumber, currPosition.column
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