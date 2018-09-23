import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Review from './Review';

const StyledSection = styled.section`
  .review-item { 
    margin-bottom: 20px;
  }
`;

const ReviewList = props => (
    <StyledSection className={props.className}>
      {
        props.data.map(v => (
            <Review className="review-item" key={v.id} data={v} />
        ))
      }
    </StyledSection>
);

ReviewList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string
};
ReviewList.defaultProps = {
    data: [],
    className: '',
};

export default ReviewList;