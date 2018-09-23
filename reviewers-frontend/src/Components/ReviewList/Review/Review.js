import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MarkdownViewer from '../../MarkdownViewer';

const StyledArticle = styled.article`
    width: 100%;
    min-height: 100px;
    border-bottom: solid 1px #b2b5b8;

    .review-header,
    .review-body {
      padding: 10px;
    }

    .review-header {
      .author {
        font-weight: 600;
      }

      .updated {
        font-size: 13px;
        color: #6f7173;
        margin-left: 10px;
      }
    }

    .review-body {
      border: solid 1px #e2e2e2;
      background-color: #fff;
    }

    .review-footer {
      padding: 10px;

      button {
        background: none;
        border: none;
        font-size: 14px;
        color: #85888a;
        text-decoration: underline;
      }
    }
`;

const Review = props => {
  const { 
    className, 
    data: { 
      body, author, updated
    } 
  }  = props;
  return (
    <StyledArticle className={className}>
      <div className="review-header">
        <span className="author">{author}</span>
        <span className="updated">{updated}</span>
      </div>
      <div className="review-body">
        <MarkdownViewer rawText={body} />
      </div>
      <div className="review-footer">
        <button>수정</button>
        <button>삭제</button>
      </div>
    </StyledArticle>
  ) 
};

Review.propTypes = {
  data: PropTypes.shape({
    body: PropTypes.string
  })
};

Review.defaultProps = {
  data: {
    body: ''
  }
};

export default Review;