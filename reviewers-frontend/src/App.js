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
        this.setState({
            writeEditorCode: newValue
        });

        console.log('write editor on change', newValue, e);
    }

    onReadEditorChange(newValue, e) {
        this.setState({
            readEditorCode: newValue
        });

        console.log('read editor on change', newValue, e);
    }

    render() {
        return (
            <div>
                {/* Read-Only .*/}
                <Editor 
                    options={{
                        minimap: {
                            enabled: false
                        },
                        readOnly: true
                    }}
                    value={this.state.readEditorCode}
                    editorDidMount={this.editorDidMount.bind(this)}
                    />
                {/* Editable */}
                <Editor 
                    options={{
                        minimap: {
                            enabled: false
                        }
                    }}
                    value={this.state.writeEditorCode}
                    onChange={this.onWriteEditorChange.bind(this)}
                    />
            </div>
        );
    }
}

export default App;
