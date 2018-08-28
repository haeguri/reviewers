import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSection = styled.section`
  width: ${props => props.width || 900}px;
  margin-left: auto;
  margin-right: auto; 
  overflow-y: hidden;
`

const PageContent = props => (
  <StyledSection 
    className={props.className}
    width={props.width}
  >
    { props.children }
  </StyledSection>
)

PageContent.propTypes = {
  width: PropTypes.number,
  className: PropTypes.string
};
  
PageContent.defaultProps = {
  width: 900,
  className: ''
};

export default PageContent;