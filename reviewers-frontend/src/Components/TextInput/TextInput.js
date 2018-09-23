import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CommonTextInputStyle = `
  
`;

const TextAreaStyle = `
  ${CommonTextInputStyle}
  resize: none;
`;

const TextInput = (props) => {
  const { 
    className, 
    maxInputLength, 
    onTextChange, 
    multiline,
    ...others
  } = props;

  let StyledTextInput;

  if(multiline) {
    StyledTextInput = styled.textarea`${TextAreaStyle}`;
  } else {
    StyledTextInput = styled.input`${CommonTextInputStyle}`;
  }

  return (
    <StyledTextInput className={className}
      maxlength={maxInputLength}
      onChange={onTextChange}
      {...others}
    />
  )
};

TextInput.propTypes = {
  onTextChange: PropTypes.func,
  className: PropTypes.string,
  maxlength: PropTypes.number,
  multiline: PropTypes.bool
};

TextInput.defaultProps = {
  onTextChange: _=>{},
  className: '',
  multiline: false
};

export default TextInput;