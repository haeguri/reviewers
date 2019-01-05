import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  font-size: 13px;
  color: #ff0000;
  padding: ${props => props.error ? `0 5px` : `0`};
`;

const InputError = (props) => {
  const { error } = props;

  return(
    <StyledSpan error={error}>{error}</StyledSpan>
  )
}

export default InputError;