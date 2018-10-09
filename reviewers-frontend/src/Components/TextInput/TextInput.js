import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTextAreaInput = styled.textarea`
  resize: none;
`;

const StyledTextInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 4px;
  border: solid 1px #c2c2c2;
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
      onTextChange, 
      multiline,
      ...others
    } = this.props;
    const { 
      StyledInput 
    } = this;

    return (
      <StyledInput 
        className={className}
        // innerRef={ref => textInputRef = ref}z
        maxlength={maxInputLength}
        onChange={e => onTextChange(e)}
        {...others}
      />
    )
  }
}

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