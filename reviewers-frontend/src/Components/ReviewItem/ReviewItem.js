import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDiv = styled.div`
    border: solid 1px black;
    width: 100%;
    height: 100px;
`;

const ReviewItem = props => (
    <StyledDiv>
        <h3>ReviewItem!</h3>
    </StyledDiv>
);

ReviewItem.propTypes = {

};

ReviewItem.defaultProps = {

}

export default ReviewItem;