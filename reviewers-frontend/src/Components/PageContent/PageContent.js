import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSection = styled.section`

`;

const PageContent = props => (
    <StyledSection>
        {props.children}
    </StyledSection>
)

PageContent.defaultProps = {

};

PageContent.propTypes = {

};

export default PageContent;