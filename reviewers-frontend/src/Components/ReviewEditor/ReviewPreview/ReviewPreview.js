import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MarkdownViewer from '../../MarkdownViewer';

const StyledWrapper = styled.div`
  height: ${props => props.height}px;
  border: solid 1px black;
  overflow-y: scroll;
`;

class ReviewPreview extends Component {
  constructor(props) {
    super(props);
    console.log('[ReviewPreview Component] constructor.', props);

    this._mouseEnterEventListener = this._mouseEnterEventListener.bind(this);
    this._mouseLeaveEventListener = this._mouseLeaveEventListener.bind(this);
  }

  _mouseEnterEventListener() {
    console.log('disable scroll');
    this.props.editor.updateOptions({
      scrollbar: {
        vertical: 'hidden',
        handleMouseWheel: false
      }
    })
  }

  _mouseLeaveEventListener() {
    console.log('enable scroll');
    this.props.editor.updateOptions({
      scrollbar: {
        vertical: 'visible',
        handleMouseWheel: true
      }
    })
  }

  componentDidMount() {
    this.ref.addEventListener('mouseenter', this._mouseEnterEventListener);
    this.ref.addEventListener('mouseleave', this._mouseLeaveEventListener);

    console.log('[ReviewPreview Component] did mounted');
  }

  componentDidUpdate() {
    console.log('[ReviewPreview Component] componentDidUpdate');
  }

  componentWillUnmount() {
    this.ref.removeEventListener('mouseenter', this._mouseEnterEventListener);
    this.ref.removeEventListener('mouseleave', this._mouseLeaveEventListener);
    console.log('[ReviewPreview Component] Will Unmount');
  }

  render() {
    const { rawText, height } = this.props;

    return (
      <StyledWrapper 
        innerRef={element => this.ref = element}
        height={height}
        >
        <MarkdownViewer rawText={rawText} />
      </StyledWrapper>
    )
  }
}

ReviewPreview.propTypes = {
    rawText: PropTypes.string,
    height: PropTypes.number
}

export default ReviewPreview;