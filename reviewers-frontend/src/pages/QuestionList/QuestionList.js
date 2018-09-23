import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PageContainer from '../../containers/PageContainer';
import { getSampleQuestionList } from '../../utils/test-utils';

const sampleQuestionList = getSampleQuestionList();

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <PageContainer width={700}>
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>언어</th>
              <th>작성자</th>
              <th>리뷰수</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
          {sampleQuestionList.map(obj => (
            <tr key={obj.id}>
              <td>
                <Link to={`/question-detail/${obj.id}`}>
                  {obj.title}
                </Link>
              </td>
              <td>{obj.language}</td>
              <td>{obj.author}</td>
              <td>{obj.reviewCount}</td>
              <td>{obj.created}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </PageContainer>
    );
  }
}

QuestionList.defaultProps = {

};

QuestionList.propTypes = {

};

export default QuestionList;