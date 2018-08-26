import React, { Component } from 'react';
import Editor from '../../components/Editor';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getSampleCode } from '../../utils/test-utils';

const sampleCode = getSampleCode() + getSampleCode() + '\nfunction test(){\n return { \n }\n}';

class QuestionDetail extends Component {
    constructor(props) {
        super(props);
        console.log('props', props);
        this.state = {

        };
    }

    render() {
        console.log(this.props);

        return (
            <div>
               <h1>Code Detail Page!</h1>
                <Editor 
                    isReadOnly={true}
                    options={{
                        readOnly: true,
                        glyphMargin: true,
                    }}
                    value={sampleCode}
                />
            </div>
        );
    }
}

QuestionDetail.defaultProps = {

};

QuestionDetail.propTypes = {

};



export default QuestionDetail;