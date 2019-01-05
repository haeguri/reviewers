import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MarkdownViewer from '../MarkdownViewer';
import TextInput from '../TextInput';
import Button from '../Button';
import InputError from '../InputError';

const StyledDiv = styled.div`
  position: relative;
  font-size: 12px;

  .md-preview-btn {
    position: absolute;
    right: 5px;
    top: 3px;
    padding: 4px;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    color: #303030;
    border-color: #303030;

    &.active {
      border-color: #c2c2c2;
      color: #c2c2c2
    }
  }

  .md-viewer {
    border: solid 1px #c2c2c2;
  }

  .md-viewer, .md-input {
    width: 100%;
    height: 100%;
    border-radius: 3px;
    border-color: ${props => props.error ? '#ff0000' : '#c2c2c2'};
  }
`;

class MarkdownEditor extends Component {
  state = {
    isPreviewMode: false
  };

  onPreviewClick = (e) => {
    e.target.classList.toggle('active');
    this.setState({
      isPreviewMode: !this.state.isPreviewMode
    })
  }

  render() {
    const { 
      onTextChange, 
      value, 
      className, 
      error 
    } = this.props;

    const { isPreviewMode } = this.state;

    return (
      <StyledDiv 
        className={className}
        innerRef={ref => this.mdEditorDOM = ref}
        error={error}
      >
        <Button className="md-preview-btn" onClick={this.onPreviewClick}>미리보기</Button>
        {!isPreviewMode ? (
          <TextInput 
            className="md-input"
            multiline={true}
            onChange={onTextChange}
            value={value}
          />
        ) : (
          <MarkdownViewer   
            className="md-viewer"
            hasScroll={true}
            rawText={value} 
          />
        )}
        <InputError error={error}/>
      </StyledDiv>
    )
  }
}

MarkdownEditor.propTypes = {
  onTextChange: PropTypes.func,
  value: PropTypes.string
};

MarkdownEditor.defaultProps = {
  onTextChange: () => {},
  value: '',
  background: 'transparent'
};

export default MarkdownEditor;