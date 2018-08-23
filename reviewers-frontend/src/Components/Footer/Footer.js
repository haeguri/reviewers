import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContentWrapper from '../../containers/ContentWrapper';

const StyledFooter = styled.footer`
    background-color: #c2c2c2;
    height: 100px;
`;

const Footer = props => (
    <StyledFooter>
        <ContentWrapper>
            <p>Footer</p>
        </ContentWrapper>
    </StyledFooter>  
);

Footer.defaultProps = {

};

Footer.propTypes = {

};

export default Footer;