import React, { Component } from 'react';
import Editor from './Editor/Editor';
import { debug } from 'util';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            writeEditorCode: (_=>{
                const code = [];

                for(let n of Array(10).fill(0)) {
                    let line = '';
                    for(let nn of Array(10).fill(n)) {
                        line += nn;
                    }

                    code.push(line);
                }

                return code.join('\n');
            })(),
            readEditorCode: (_=>{
                const code = [];

                Array(10).fill(0).forEach((v, i) => {
                    let line = '';

                    Array(10).fill(0).forEach(() => {
                        line += (i+1);
                    })

                    code.push(line);
                });

                return code.join('\n');
            })()
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

        editor.deltaDecorations([], [
            {
                range: new monaco.Range(3, 1, 3, 1),
                options: {
                    glyphMarginClassName: 'comment-btn'
                }
            }
        ])

        editor.onMouseDown(e => {
            console.log('mouse down ! ', e);
        })

        editor.onMouseMove(e => {
            // debugger;
            console.log('EventTarget toString', e.target.toString());
            console.log('Position : ', e.target.position);
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
