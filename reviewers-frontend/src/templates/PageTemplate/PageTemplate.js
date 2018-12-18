import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HeaderContainer from '../../containers/Header';
import Footer from '../../components/Footer';

const StyledSection = styled.section`
  width: ${props => props.width}px;
  margin-left: auto;
  margin-right: auto;
`;

const PageTemplate = props => {
  const { width, className, children } = props;
  return (
    <React.Fragment>
      <HeaderContainer width={width} />
      <StyledSection className={className} width={width}>
        { children }
      </StyledSection>
      <Footer width={width} />
    </React.Fragment>
  )
}

PageTemplate.propTypes = {
  width: PropTypes.number,
  className: PropTypes.string
};
  
PageTemplate.defaultProps = {
  width: 900,
  className: ''
};

export default PageTemplate;