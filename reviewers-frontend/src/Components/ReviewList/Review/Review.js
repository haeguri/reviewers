import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MarkdownViewer from '../../MarkdownViewer';

const StyledArticle = styled.article`
    border: solid 1px black;
    width: 100%;
    min-height: 100px;

    .review-header,
    .review-body {
      padding: 10px;
    }

    .review-header {
      border-bottom: solid 1px black;
    }
`;

const Review = props => {
  const { className: className, data: { body } }  = props;
  return (
    <StyledArticle 
      className={className}
      >
      <div className="review-header">
        <p>header...</p>
      </div>
      <div className="review-body">
        <MarkdownViewer rawText={body} />
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