import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTextAreaInput = styled.textarea`
  resize: none;
`;
const StyledTextInput = styled.input`

`;

let StyledInput;

const TextInput = (props) => {
  const { 
    className, 
    maxInputLength, 
    onTextChange, 
    multiline,
    ...others
  } = props;

  if(!StyledInput) {
    StyledInput = multiline ? StyledTextAreaInput : StyledTextInput;
  }

  return (
    <StyledInput 
      className={className}
      // innerRef={ref => textInputRef = ref}z
      maxlength={maxInputLength}
      onChange={e => onTextChange(e)}
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