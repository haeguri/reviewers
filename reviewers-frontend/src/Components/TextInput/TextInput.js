import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CommonTextInputStyle = `
  width: ${props => props.width};
  height: ${props => props.height};
`

const TextAreaStyle = `${CommonTextInputStyle}
  resize: none;
`

const TextInput = (props) => {
  const { 
    className, 
    maxInputLength, 
    onTextChange, 
    width, 
    height,
    multiline
  } = props;

  let StyledTextInput;

  if(multiline) {
    StyledTextInput = styled.textarea`${TextAreaStyle}`;
  } else {
    StyledTextInput = styled.input`${CommonTextInputStyle}`;
  }

  return (
    <StyledTextInput
      className={className}
      maxlength={maxInputLength}
      onChange={onTextChange}
      width={width}
      height={height}
    />
  )
};

TextInput.propTypes = {
  onTextChange: PropTypes.func,
  className: PropTypes.string,
  maxlength: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  multiline: PropTypes.bool
};

TextInput.defaultProps = {
  onTextChange: _=>{},
  className: '',
  width: '100%',
  height: '20px',
  multiline: false
};

export default TextInput;