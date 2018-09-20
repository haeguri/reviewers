import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  display: block;
  height: ${props => props.height}px;
  width: 100%;
  resize: none;
  font-size: 1em;
`;

class ReviewInput extends Component {
  constructor(props) {
    super(props);
    console.log('[TextInput Component] constructor.');
  }

  render() {
    return (
      <StyledTextarea
        innerRef={element => this.ref = element}
        height={this.props.height}
        onChange={e => this.props.onChange(e.target.value)}
        value={this.props.value}
      />
    )
  }
}

ReviewInput.propTypes = {
  editor: PropTypes.object,
  height: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default ReviewInput;