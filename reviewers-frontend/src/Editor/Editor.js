import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';

class Editor extends Component {
    eidtor = null;
    monaco = null;

    constructor(props) {
        super(props);

        Object.assign(props.options, { contextmenu: false });
    }
    
    editorDidMount(editor, monaco) {
        editor.focus();

        this.editor = editor;
        this.monaco = monaco;

        this.props.editorDidMount(editor, monaco);
    }

    render() {
        return (
            <MonacoEditor
                theme="vs-dark"
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