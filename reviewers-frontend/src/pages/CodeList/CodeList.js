import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const sampleCodeList = [
    {
        id: '1',
        title: 'test1',
        author: 'author1',
        reviewCount: 4,
        created: '2018-07-01'
    },
    {
        id: '2',
        title: 'test2',
        author: 'author2',
        reviewCount: 5,
        created: '2018-07-01'
    }
];

class CodeList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
               <table>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>리뷰</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {sampleCodeList.map(obj => (
                        <tr key={obj.id}>
                            <td>
                                <Link to={`/code-detail/${obj.id}`}>
                                {obj.title}
                                </Link>
                            </td>
                            <td>{obj.author}</td>
                            <td>{obj.reviewCount}</td>
                            <td>{obj.created}</td>
                        </tr>
                    ))}
                    </tbody>
               </table>
               
            </div>
        );
    }
}

CodeList.defaultProps = {

};

CodeList.propTypes = {

};



export default CodeList;