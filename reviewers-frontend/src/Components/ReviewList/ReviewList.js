import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Review from './Review';

const StyledSection = styled.section`
    overflow-y: scroll;
    /* width */
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #c2c2c2;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #a2a2a2;
    }
`;

const ReviewList = props => (
    <StyledSection
      className={props.className}
      >
      {
        props.data.map(v => <Review key={v.id} data={v} />)
      }
    </StyledSection>
)

ReviewList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string
};
ReviewList.defaultProps = {
    data: [],
    className: '',
};

export default ReviewList;