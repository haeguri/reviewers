import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledFooter = styled.footer`
    background-color: #c2c2c2;
    height: 100px;
    width: 100%;
    overflow: hidden;
    min-width: ${props => {
      const width = parseInt(props.width, 10);
      return width > 900 ? width : 900;
    }}px;

    .container {
      width: 900px;
      margin: 0 auto;
    }
`;

const Footer = props => (
    <StyledFooter width={props.width}>
      <div className="container">
        <p>Footer</p>
      </div>
    </StyledFooter>  
);

Footer.defaultProps = {

};

Footer.propTypes = {

};

export default Footer;