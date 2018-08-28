import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyeldTextInput = styled.input`
  width: ${props => props.width};
  height: ${props => props.height};
`;

const TextInput = (props) => {
  console.log(props);
  const { className, maxInputLength, onTextChange, width, height } = props;

  return (
    <StyeldTextInput
      className={className}
      maxlength={maxInputLength}
      onChange={onTextChange}
      width={width}
      height={height}
    >
    </StyeldTextInput>
  )
};

TextInput.propTypes = {
  onTextChange: PropTypes.func,
  className: PropTypes.string,
  maxlength: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
};

TextInput.defaultProps = {
  onTextChange: _=>{},
  className: '',
  width: '100%',
  height: '20px',
};

export default TextInput;