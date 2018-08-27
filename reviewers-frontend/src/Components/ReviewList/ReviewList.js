import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReviewItem from '../ReviewItem';

const StyledSection = styled.section`
    overflow: scroll;
`;

const ReviewList = props => (
    <StyledSection
        className={props.className}>
        {props.data.map(v => <ReviewItem key={v.id} data={v} />)}
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