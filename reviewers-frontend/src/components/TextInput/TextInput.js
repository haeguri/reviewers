import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  input, textarea {
    font-size: 13px;
    border-style: solid;
    border-width: 1px;
    border-color: ${props => props.error ? '#ff0000' : '#c2c2c2'};
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

  .error-msg {
    font-size: 13px;
    color: #ff0000;
    padding: ${props => props.error ? `0 5px` : `0`};
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
      <span className="error-msg">{error}</span>
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