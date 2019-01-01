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

    .intro {
      text-align: center;
      color: #a2a2a2;
    }
`;

const Footer = props => (
    <StyledFooter width={props.width}>
      <div className="container">
        <p className="intro">Made by <a href="https://github.com/haeguri" rel="noopener noreferrer" target="_blank"><strong>Haegyun Jung</strong></a></p>
      </div>
    </StyledFooter>
);

export default Footer;