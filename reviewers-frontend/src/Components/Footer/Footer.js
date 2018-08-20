import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledFooter = styled.footer`
    background-color: #c2c2c2;
    height: 100px;
`;

const Footer = props => (
    <StyledFooter>
        <p>Footer</p>
    </StyledFooter>  
);

Footer.defaultProps = {

};

Footer.propTypes = {

};

export default Footer;