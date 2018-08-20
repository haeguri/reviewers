import React, { Component } from 'react';
import Editor from './components/Editor';
import Header from './components/Header';
import Footer from './components/Footer';
import PageContent from './components/PageContent';
import styled from 'styled-components';

const StyledDiv = styled.div`
    * {
        box-sizing: border-box;
    }
`;

const menuList = [
    {
        name: 'Code',
        path: 'code'
    },
    {
        name: 'Write',
        path: 'write'
    }
]
class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            writeEditorCode: sampleCode(),
            readEditorCode: sampleCode() + sampleCode() + '\nfunction test(){\n return { \n }\n}'
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
            <StyledDiv className="app-container">
                <Header menuList={menuList}/>
                <PageContent>
                    {/* Read-Only */}
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
                </PageContent>
                <Footer />
            </StyledDiv>
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
