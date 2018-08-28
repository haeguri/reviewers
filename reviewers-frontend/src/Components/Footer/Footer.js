import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledFooter = styled.footer`
    background-color: #c2c2c2;
    height: 100px;
    overflow: hidden;

    .container {
      width: 900px;
      margin: 0 auto;
    }
`;

const Footer = props => (
    <StyledFooter>
      <div class="container">
        <p>Footer</p>
      </div>
    </StyledFooter>  
);

Footer.defaultProps = {

};

Footer.propTypes = {

};

export default Footer;