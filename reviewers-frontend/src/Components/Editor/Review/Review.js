import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    border: solid 1px black;
    height: 100%;
`

const Review = (props) => {
    return (
        <StyledWrapper>
            <h1>This is Review Component!</h1>
            <button onClick={() => props.onCancelClick()}>Close Button</button>
        </StyledWrapper>
    )
}

export default Review;

Review.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    onCancelClick: PropTypes.func
};