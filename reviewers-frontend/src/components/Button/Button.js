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

  return (
    <StyledButton className={className}
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
  type: 'button'
}

export default Button;