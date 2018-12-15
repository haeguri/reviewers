import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    border-top: solid 1px #e2e2e2;
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
        <p className="intro">Footer</p>
      </div>
    </StyledFooter>  
);

export default Footer;