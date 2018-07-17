import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';

class Editor extends Component {
    editorDidMount(editor, monaco) {
        editor.focus();

        this.props.editorDidMount(editor, monaco);
    }

    onChange(newValue, e) {
        this.props.onChange(newValue, e)
    }

    render() {
        return (
            <MonacoEditor
                width="600"
                height="600"
                language="javascript"
                value={this.props.value}
                theme="vs-dark"
                options={this.props.options}
                onChange={(newValue, e) => this.onChange(newValue, e)}
                editorDidMount={(editor, monaco) => this.editorDidMount(editor, monaco)}
            />
        )
    }
}

export default Editor;