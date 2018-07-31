import React, { Component } from 'react';
import Editor from './components/Editor/Editor';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            writeEditorCode: sampleCode(),
            readEditorCode: sampleCode() + '\n' + 'function test(){\n return { \n }\n}'
        };
    }

    readEditorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
    }

    onWriteEditorChange(newValue, e) {
        this.setState({
            writeEditorCode: newValue
        });

        console.log('write editor on change', newValue, e);
    }

    render() {
        return (
            <div className="app-container">
                {/* Read-Only .*/}
                <Editor 
                    isReadOnly={true}
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
