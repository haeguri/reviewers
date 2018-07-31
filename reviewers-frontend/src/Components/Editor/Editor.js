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
        let prevPosition;
        let prevViewZoneId;

        let widgetId = 1;

        this.editor.onMouseDown(e => {
            if(e.target.position === null) {
                return;
            }

            let currPosition = e.target.position;

            console.log(e.target);

            if(typeof prevPosition === 'undefined') {
                prevPosition = currPosition;
            }else if(prevPosition.lineNumber === currPosition.lineNumber) {
                return;
            }

            const REVIEW_COMMENT_HEIGHT = 200;

            if(e.target.element.className.indexOf('comment-btn')) {
                const { editor, monaco } = this;

                editor.addContentWidget({
                    domNode: null,
                    getId() {
                        return currPosition.lineNumber + ',' + currPosition.column;
                    },
                    getDomNode() {
                        let { domNode } = this;

                        if (!domNode) {
                            domNode = document.createElement('div');

                            ReactDOM.render(
                                <Review
                                    onCancelClick={() => {
                                        editor.removeContentWidget(this);
                                        editor.changeViewZones(changeAccessor => {
                                            changeAccessor.removeZone(prevViewZoneId);
                                        })
                                    }}>
                                </Review>,
                                domNode
                            );

                            domNode.style.background = 'grey';
                            domNode.style.height = REVIEW_COMMENT_HEIGHT + 'px';
                        }

                        return domNode;
                    },
                    getPosition() {
                        const { lineNumber, column } = currPosition;
                        return {
                            position: { lineNumber, column },
                            preference: [ monaco.editor.ContentWidgetPositionPreference.BELOW ]
                        };
                    }
                })

                editor.changeViewZones(changeAccessor => {
                    // ContentWidget이 들어갈 자리를 만들기 위한 Dummy DOM Node
                    const dummyDomNode = document.createElement('div');

                    prevViewZoneId = changeAccessor.addZone({
                        afterLineNumber: currPosition.lineNumber,
                        afterColumn: currPosition.column,
                        heightInPx: REVIEW_COMMENT_HEIGHT,
                        domNode: dummyDomNode,
                    });
                });
            }

            prevPosition = currPosition;
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