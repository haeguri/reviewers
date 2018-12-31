import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReviewContainer from '../../containers/ReviewContainer';

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
  const { data, selectedLine } = props;

  return (
    <StyledSection className={props.className}>
      {data.length <= 0 ? (
        <p className="info-data-empty">작성된 리뷰가 없습니다.</p>
      ) : (
        data.map(v => (
          <ReviewContainer 
            className="review-item" 
            selectedLine={selectedLine}
            key={v._id} 
            data={v} 
          />
        ))
      )}
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