import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MarkdownViewer from '../MarkdownViewer';
import TextInput from '../TextInput';
import ToggleButton from '../ToggleButton';


const StyledDiv = styled.div`
  position: relative;
  font-size: 12px;

  .md-preview-btn {
    position: absolute;
    right: 5px;
    top: 3px;
    padding: 2px 4px;
    background-color: rgba(255, 255, 255, 0.5);
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

  .md-viewer, .md-input {
    width: 100%;
    height: 100%;
  }

  .md-input {
    border: solid 1px #c2c2c2;
    border-radius: 5px;
    font-size: 13px;
    background-color: #f4f4f5;
  }

  .md-viewer {
    border: solid 1px #c2c2c2;
    border-radius: 5px;
  }
`;

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();

    this.state = {
      isPreviewMode: false
    };
  }

  onPreviewClick(e) {
    this.setState({
      isPreviewMode: !this.state.isPreviewMode
    })

    // not working.
    // e.stopPropagation();
  }

  render() {
    const { onTextChange, value, ...others } = this.props;
    const { isPreviewMode } = this.state;

    return (
      <StyledDiv
        innerRef={ref => this.ref = ref}
        {...others}
      >
        <ToggleButton 
          className="md-preview-btn" 
          onClick={e => this.onPreviewClick(e)}>
          Preview
        </ToggleButton>
        {
          !isPreviewMode ?
          (<TextInput 
            className="md-input"
            multiline={true}
            onChange={e => onTextChange(e)}
            value={value} />) :
          (<MarkdownViewer 
            className="md-viewer"
            hasScroll={true}
            rawText={value} />)
        }
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
  value: ''
};

export default MarkdownEditor;