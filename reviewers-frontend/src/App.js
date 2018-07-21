import React, { Component } from 'react';
import Editor from './Editor/Editor';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            writeEditorCode: sampleCode(),
            readEditorCode: sampleCode()
        };
    }

    readEditorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);

        let viewZoneId;
        editor.changeViewZones(function(changeAccessor) {
            var domNode = document.createElement('div');
            domNode.style.background = 'lightgreen';
            viewZoneId = changeAccessor.addZone({
                afterLineNumber: 3,
                heightInLines: 3,
                domNode: domNode
            });
        });

        editor.onMouseDown(e => {
            console.log('mouse down ! ', e);
        })

        // let prevLineNumber;
        let prevPosition;
        let oldOwnerId;
        editor.onMouseMove(e => {
            let currPosition;

            if(e.target.position === null) {
                return;
            }

            // 마우스 움직일 때 알 수 있어야 한다. 
            // 마우스가 움직이는 line number가 바뀔 때 알 수 있어야 한다. (*)
            // line number가 바꼈을 때 
            //      1) 이전의 line nubmer에 있는 comment button을 제거 한다.
            //      2) 이번의 line nubmer에 있는 comment button을 추가 한다.

            prevPosition = prevPosition || e.target.position;
            currPosition = e.target.position;

            if(prevPosition.lineNumber !== currPosition.lineNumber) {
                console.log('line number is changed!');
            }

            prevPosition = currPosition;

            let oldDecorations = [];

            if(typeof oldOwnerId === 'undefined') {
                oldDecorations = [];
            } else {
                oldDecorations = [oldOwnerId];
            }

            oldOwnerId = editor.deltaDecorations(oldDecorations, [
                {
                    range: new monaco.Range(
                        currPosition.lineNumber, currPosition.colNumber, 
                        currPosition.lineNumber, currPosition.colNumber
                    ),
                    options: {
                        linesDecorationsClassName: 'comment-btn'
                    }
                }
            ])
                           
            // debugger;
            // console.log('EventTarget toString', e.target.toString());
            // console.log('Position : ', e.target.position);
            // console.log('Range : ', e.target.range);
            // console.log('Mouse Column : ', e.target.mouseColumn);
            // console.log('Column : ', e.target.position.column);
            // console.log('Line Number : ', e.target.position.lineNumber);
        })
    }

    onWriteEditorChange(newValue, e) {
        this.setState({
            writeEditorCode: newValue
        });

        console.log('write editor on change', newValue, e);
    }

    render() {
        return (
            <div>
                {/* Read-Only .*/}
                <Editor 
                    options={{
                        minimap: { enabled: false },
                        readOnly: true,
                        glyphMargin: true,
                    }}
                    value={this.state.readEditorCode}
                    editorDidMount={this.readEditorDidMount.bind(this)}
                    />
                {/* Editable */}
                <Editor 
                    options={{
                        minimap: { enabled: false }
                    }}
                    value={this.state.writeEditorCode}
                    onChange={this.onWriteEditorChange.bind(this)}
                    />
            </div>
        );
    }
}

export default App;

function sampleCode() {
    const code = [];

    Array(10).fill(0).forEach((v, i) => {
        let line = '';

        Array(10).fill(0).forEach(() => {
            line += (i+1);
        })

        code.push(line);
    });

    return code.join('\n');
}
