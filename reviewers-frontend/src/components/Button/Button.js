import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledButton = styled.button`
  border: solid 1px #b2b2b2;
  padding: 6px 15px;
  border-radius: 3px;
  font-size: 14px;
  background: #fff;

  &.icon {
    border: none;
    padding: 0;
    font-size: 1em;
  }

  &.filled.primary {
    font-weight: 600;
    background: #1162bc;
    border-color: #1162bc;
    color: white;
  }
`;

const Button = (props) => {
  let className = props.className;
  let children;

  if (props.icon) {
    className = ' icon';
    children = (
      <FontAwesomeIcon icon={props.icon}>
        {props.children}
      </FontAwesomeIcon>
    )
  } else {
    children = props.children;
  }

  return (
    <StyledButton {...props}
                  className={className}>
      { children }
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