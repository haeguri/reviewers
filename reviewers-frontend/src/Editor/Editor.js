import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';

class Editor extends Component {
    editorDidMount(editor, monaco) {
        editor.focus();

        this.props.editorDidMount(editor, monaco);
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
                onChange={(newValue, e) => this.props.onChange(newValue, e)}
                editorDidMount={(editor, monaco) => this.editorDidMount(editor, monaco)}
            />
        )
    }
}

Editor.defaultProps = {
    editorDidMount: _=>{},
    onChange: _=>{}
};

Editor.propTypes = {
    value: PropTypes.string,
    options: PropTypes.object,
    editorDidMount: PropTypes.func,
    onChange: PropTypes.func
};

export default Editor;