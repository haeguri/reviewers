import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class CodeDetail extends Component {
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
            </div>
        );
    }
}

CodeDetail.defaultProps = {

};

CodeDetail.propTypes = {

};



export default CodeDetail;