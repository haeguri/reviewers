import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Review from './Review';

const StyledSection = styled.section`
  .review-item { 
    margin-bottom: 20px;
  }

  .info-data-empty {
    margin: 40px 0;
    font-weight: 600;
    text-align: center;
  }
`;

const ReviewList = props => {
  let reviewItems;

  if (props.data.length > 0) {
    reviewItems = props.data.map(v => (<Review className="review-item" key={v._id} data={v} />))
  } else {
    reviewItems = <p className="info-data-empty">작성된 리뷰가 없습니다.</p>;
  }

  return (
    <StyledSection className={props.className}>
      {reviewItems}
    </StyledSection>
  );
}

ReviewList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string
};
ReviewList.defaultProps = {
    data: [],
    className: '',
};

export default ReviewList;