import React, { Component } from 'react';
import Editor from '../../components/Editor';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getSampleCode } from '../../utils/test-utils';

class NewQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: getSampleCode()
        };
    }

    onCodeChange(newValue, e) {
        this.setState({
            code: newValue
        });
        console.log('write editor on change', newValue, e);
    }

    render() {
        return (
            <div>
                <h1>New Code Page!</h1>
                <Editor 
                    value={this.state.code}
                    onChange={(newValue, e) => this.onCodeChange(newValue, e)}
                />
            </div>
        )
    }
}

NewQuestion.defaultProps = {

};

NewQuestion.propTypes = {

};



export default NewQuestion;