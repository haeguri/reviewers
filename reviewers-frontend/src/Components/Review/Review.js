import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MarkdownEditor from '../MarkdownEditor';

const StyledWrapper = styled.div`
    height: 100%;
    padding: 15px;
    border: solid 1px #c2c2c2;
`;

const Review = (props) => (
    <StyledWrapper>
        <MarkdownEditor />
    </StyledWrapper>
);

export default Review;

Review.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    onCancelClick: PropTypes.func
};