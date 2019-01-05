import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledButton = styled.button`
  padding: 6px 15px;
  border-radius: 3px;
  font-size: 14px;
  background: #fff;
  border: solid 1px #b2b2b2;

  &.primary {
    background: #0f4da9;
    border-color: #0f4da9;
    color: white;
    font-weight: 600;
  }

  &.icon {
    border: none;
    padding: 4px 6px;
    font-size: 1em;
  }
`;

const Button = (props) => {
  let { 
    className, 
    icon, 
    children,
    onClick,
    type,
    ...others 
  } = props;

  if (icon) {
    className = 'icon';
    children = (
      <FontAwesomeIcon icon={icon}>
        {children}
      </FontAwesomeIcon>
    )
  }

  const onButtonClick = (e) => {
    if(type === 'submit') {
      e.preventDefault();
    }

    onClick(e);
  }

  return (
    <StyledButton
      type={type}
      className={className}
      onClick={onButtonClick}
      {...others}>
      { children }
    </StyledButton>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string
}

Button.defaultProps = {
  type: 'button',
  onClick: _=>{}
}

export default Button;