import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import InputError from '../InputError';

const borderColorMixin = css`
  border-color: ${props => {
    if (props.error) {
      return '#ff0000';
    } else if (props.error === null) {
      return '#c2c2c2';
    } else if (props.error === undefined) {
      return 'inherit';
    }
  }};
`

const StyledDiv = styled.div`
  input, textarea {
    font-size: 13px;
    border-style: solid;
    border-width: 1px;
    ${borderColorMixin}
    border-radius: 3px;
    width: 100%;
    height: 100%;
    padding: 5px;
  }

  textarea {
    resize: none;
  }

  input {
    width: 100%;
    height: 36px;
    border-radius: 4px;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const TextInput = (props) => {
  const { 
    className, 
    error,
    multiline,
    ...others
  } = props;

  return (
    <StyledDiv className={className} error={error}>
      { !multiline ? (
        <input {...others} />
      ) : (
        <textarea {...others} />
      )}
      <InputError error={error}/>
    </StyledDiv>
  )
}

TextInput.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  maxlength: PropTypes.number,
  multiline: PropTypes.bool
};

TextInput.defaultProps = {
  onChange: _=>{},
  className: '',
  multiline: false,
};

export default TextInput;