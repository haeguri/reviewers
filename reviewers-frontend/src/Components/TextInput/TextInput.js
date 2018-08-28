import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyeldTextInput = styled.input`
  width: 100%;
  height: 50px;
`;

const TextInput = (props) => {
  const { className, maxInputLength, onTextChange } = props;

  return (
    <StyeldTextInput
      className={className}
      maxlength={maxInputLength}
      onChange={onTextChange}
    >
    </StyeldTextInput>
  )
};

TextInput.propTypes = {
  onTextChange: PropTypes.func,
  className: PropTypes.string,
  maxlength: PropTypes.number
};

TextInput.defaultProps ={
  onTextChange: _=>{},
  className: ''
};

export default TextInput;