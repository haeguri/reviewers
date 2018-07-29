import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';
import Review from './Review/Review.js';
import './Editor.css';

const COMMENT_BTN_CLASSNAME = 'comment-btn';
const REVIEW_COMPONENT_HEIGHT = 200;

class Editor extends Component {
    eidtor = null;
    monaco = null;

    constructor(props) {
        super(props);

        this.refReview = React.createRef();

        Object.assign(props.options, { 
            contextmenu: false,
        });
    }

    editorDidMount(editor, monaco) {
        this.editor = editor;
        this.monaco = monaco;

        // React.render()

        this.editor.focus();

        if(this.props.isReadOnly) {
            this._attachMouseDownEventListener();
            this._attachMouseMoveEventListener();
        }

        this.props.editorDidMount(editor, monaco);
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
                editorDidMount={(editor, monaco) => this.editorDidMount(editor, monaco)}
            />
        )
    }

    _attachMouseDownEventListener() {
        let prevPosition;
        let prevViewZoneId;

        this.editor.onMouseDown(e => {
            if(e.target.position === null) {
                return;
            }

            let currPosition = e.target.position;

            if(typeof prevPosition === 'undefined') {
                prevPosition = currPosition;
                if(e.target.element.className.indexOf(COMMENT_BTN_CLASSNAME)) {
                    this.editor.changeViewZones(function(changeAccessor) {
                        const domNode = document.createElement('div');
                        ReactDOM.render(<Review height={REVIEW_COMPONENT_HEIGHT}/>, domNode);
                        prevViewZoneId = changeAccessor.addZone({
                            afterLineNumber: currPosition.lineNumber,
                            afterColumn: currPosition.colNumber,
                            heightInPx: REVIEW_COMPONENT_HEIGHT,
                            domNode: domNode
                        });
                    });
                }
                return;
            }

            if(prevPosition.lineNumber === currPosition.lineNumber) {
                return;
            }

            if(e.target.element.className.indexOf(COMMENT_BTN_CLASSNAME)) {
                this.editor.changeViewZones(function(changeAccessor) {
                    changeAccessor.removeZone(prevViewZoneId);

                    const domNode = document.createElement('div');
                    ReactDOM.render(<Review height={REVIEW_COMPONENT_HEIGHT} />, domNode);
                    prevViewZoneId = changeAccessor.addZone({
                        afterLineNumber: currPosition.lineNumber,
                        afterColumn: currPosition.colNumber,
                        heightInPx: REVIEW_COMPONENT_HEIGHT,
                        domNode: domNode
                    });
                });
            }

            prevPosition = currPosition;

            // console.log('mouse down ! ', e);
            // 
        })
    }

    _attachMouseMoveEventListener() {
        let prevPosition;
        let prevDecoId;

        this.editor.onMouseMove(e => {
            if(e.target.position === null) {
                return;
            }

            let currPosition = e.target.position;

            if(typeof prevPosition === 'undefined') {
                prevPosition = currPosition;
                prevDecoId = this._updateDecorations([], currPosition);
                return;
            }

            if(prevPosition.lineNumber === currPosition.lineNumber) {
                return;
            }

            prevDecoId = this._updateDecorations([prevDecoId], currPosition);
            prevPosition = currPosition;
        })
    }

    _updateDecorations(oldDecos, currPosition) {
        return this.editor.deltaDecorations(oldDecos, [
            {
                range: new this.monaco.Range(
                    currPosition.lineNumber, currPosition.colNumber, 
                    currPosition.lineNumber, currPosition.colNumber
                ),
                options: {
                    glyphMarginClassName: COMMENT_BTN_CLASSNAME,
                }
            }
        ]);
    }
}

Editor.defaultProps = {
    editorDidMount: _=>{},
    onChange: _=>{},
    language: 'javascript',
    width: "600",
    height: "600",
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