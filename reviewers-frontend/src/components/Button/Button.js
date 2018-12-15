import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  border-width: 1px;
  border-style: solid;
  border-color: #b2b2b2;
  padding: 6px 15px;
  border-radius: 3px;
  font-size: 14px;

  &.filled.primary {
    font-weight: 600;
    background: #1162bc;
    border-color: #1162bc;
    color: white;
  }
`;

const Button = (props) => {
    return (
        <StyledButton
            {...props}
            className={props.className}>
            { props.children }
        </StyledButton>
    );
}

Button.defaultProps = {
    className: 'default'
}


Button.propTypes = {
    className: PropTypes.string
}

export default Button;