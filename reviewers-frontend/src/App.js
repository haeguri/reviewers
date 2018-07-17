import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            code: '// type your code...',
        }
    }

    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();

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

    onChange(newValue, e) {
        console.log('onChange', newValue, e);
    }

    render() {
        const code = this.state.code;
        const options = {
          selectOnLineNumbers: true,
          minimap: {
              enabled: false
          }
        };

        return (
          <MonacoEditor
            width="600"
            height="600"
            language="javascript"
            value={code}
            theme="vs-dark"
            options={options}
            onChange={(newValue, e) => this.onChange(newValue, e)}
            editorDidMount={(editor, monaco) => this.editorDidMount(editor, monaco)}
          />
        );
    }
}

export default App;
