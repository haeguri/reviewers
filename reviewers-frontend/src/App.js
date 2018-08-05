import React, { Component } from 'react';
// import Editor from './Components/Editor/Editor';
import Button from './Components/Button';

class App extends Component {
    render() {
        return (
            <div>
                <Button big>
                    버튼
                </Button>
                <Button>
                    버튼
                </Button>
            </div>
        )
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
