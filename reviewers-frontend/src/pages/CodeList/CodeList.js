import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const sampleCodeList = [
    {
        id: '1',
        name: 'test1'
    },
    {
        id: '2',
        name: 'test2'
    }
]

class CodeList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
               <h1>Code List Page!</h1>
               {sampleCodeList.map(obj => (
                   <div key={obj.id}>
                     <Link to={`/code-detail/${obj.id}`}>
                       이동
                     </Link>
                   </div>
               ))}
            </div>
        );
    }
}

CodeList.defaultProps = {

};

CodeList.propTypes = {

};



export default CodeList;