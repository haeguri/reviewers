import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';
import './Editor.css';

const COMMENT_BTN_CLASSNAME = 'comment-btn';

class Editor extends Component {
    eidtor = null;
    monaco = null;

    constructor(props) {
        super(props);

        Object.assign(props.options, { 
            contextmenu: false,
        });
    }

    editorDidMount(editor, monaco) {
        this.editor = editor;
        this.monaco = monaco;

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
        var viewZoneId;

        this.editor.onMouseDown(e => {
            console.log('mouse down ! ', e);
            if(e.target.element.className.indexOf(COMMENT_BTN_CLASSNAME)) {
                this.editor.changeViewZones(function(changeAccessor) {
                    var domNode = document.createElement('div');
                    domNode.style.background = 'lightgreen';
                    viewZoneId = changeAccessor.addZone({
                        afterLineNumber: 3,
                        heightInLines: 3,
                        domNode: domNode
                    });
                });
            }
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