import React, { Component } from 'react';
import Editor from './Editor/Editor';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            writeEditorCode: '// This is sample comment..',
            readEditorCode: '// This is sample comment..',
        };
    }

    editorDidMount(editor, monaco) {
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
    }

    onWriteEditorChange(newValue, e) {
        console.log('write editor on change', newValue, e);
    }

    onReadEditorChange(newValue, e) {
        console.log('read editor on change', newValue, e);
    }

    render() {
        const writeEditorOptions = {
            minimap: {
                enabled: false
            }
        }
        
        const readEditorOptions = {
            minimap: {
                enabled: false
            },
            readOnly: true
        }

        return (
            <div>
                {/* Read-Only */}
                <Editor 
                    options={readEditorOptions}
                    value={this.state.readEditorCode}
                    onChange={this.onReadEditorChange.bind(this)}
                    editorDidMount={this.editorDidMount.bind(this)}
                    />
                {/* Editable */}
                <Editor 
                    options={writeEditorOptions}
                    value={this.state.writeEditorCode}
                    onChange={this.onWriteEditorChange.bind(this)}
                    editorDidMount={this.editorDidMount.bind(this)}
                    />
            </div>
        );
    }
}

export default App;
