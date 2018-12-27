import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const commonStyle = `
  font-size: 13px;
`;  

const StyledTextAreaInput = styled.textarea`
  ${commonStyle}
  resize: none;
`;
const StyledTextInput = styled.input`
  ${commonStyle}
  width: 100%;
  height: 30px;
  border-radius: 4px;
  border: solid 1px #c2c2c2;
  padding: 0 5px;
`;

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.StyledInput = props.multiline ?  StyledTextAreaInput : StyledTextInput;
  }

  render() {
    const { 
      className, 
      maxInputLength, 
      onChange,
      value,
    } = this.props;

    const { 
      StyledInput 
    } = this;

    return (
      <StyledInput className={className}
                   maxlength={maxInputLength}
                   onChange={onChange}
                   value={value}
      />
    )
  }
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
  multiline: false
};

export default TextInput;