import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const StyledSection = styled.section`
  width: ${props => props.width}px;
  margin-left: auto;
  margin-right: auto;
`;

const PageContainer = props => (
  <div>
    <Header width={props.width} />
    <StyledSection 
      className={props.className}
      width={props.width}
    >
      { props.children }
    </StyledSection>
    <Footer width={props.width} />
  </div>
)

PageContainer.propTypes = {
  width: PropTypes.number,
  className: PropTypes.string
};
  
PageContainer.defaultProps = {
  width: 900,
  className: ''
};

export default PageContainer;