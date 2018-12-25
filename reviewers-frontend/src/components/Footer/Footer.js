import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    border-top: solid 1px #e2e2e2;
    height: 100px;
    overflow: hidden;
    width: ${props => props.width}px;

    @media screen and (min-width: ${props => props.width}px) {
      width: 100%;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
    }
`;

const Footer = props => (
    <StyledFooter width={props.width}>
      <div className="container">
        <p className="intro">Footer</p>
      </div>
    </StyledFooter>
);

export default Footer;