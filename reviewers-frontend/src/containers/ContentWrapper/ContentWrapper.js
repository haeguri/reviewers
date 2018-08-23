import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
    width: 900px;
    margin-left: auto;
    margin-right: auto;
`

const ContentWrapper = props => (
    <StyledSection className={props.className}>
        { props.children }
    </StyledSection>
)

export default ContentWrapper;