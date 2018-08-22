import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { centerWithAbsSize } from '../../utils/style-utils';

const StyledFooter = styled.footer`
    background-color: #c2c2c2;
    height: 100px;

    .content {
        ${ centerWithAbsSize('desktop') }
    }
`;

const Footer = props => (
    <StyledFooter>
        <section className="content">
            <p>Footer</p>
        </section>
    </StyledFooter>  
);

Footer.defaultProps = {

};

Footer.propTypes = {

};

export default Footer;