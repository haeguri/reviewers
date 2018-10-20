import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  padding-top: 50px;
  border: solid 1px #e6e6e6;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1), 
              0 3px 1px -2px rgba(0, 0, 0, 0.16), 
              0 1px 5px 0 rgba(0, 0, 0, 0.08);

  .card-header {
    margin: 0;
    text-align: center;
    color: #575757;
    font-size: 30px;
    font-weight: 500;
  }
`;

const CardForm = props => (
  <StyledSection>
    <h2 className="card-header">{props.headerMsg}</h2>
    {props.children}
  </StyledSection>
)

export default CardForm;