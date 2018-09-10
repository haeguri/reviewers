import React, { Component } from 'react';
import marked from 'marked';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDiv = styled.div`
  & * {
    margin: 0 0 0.8em 0;
  }

  h1 { font-size: 18px; }
  h2 { font-size: 16px; }
  h3 { font-size: 15px; }
  h4 { font-size: 14px; }
  h5, h6 { font-size: 13px; }
  overflow: hidden;
`

const MarkdownViewer = props => {
  const { className, rawText } = props;
  const markup = {
    __html: marked(rawText)
  };

  return (
    <StyledDiv 
      className={className}
      dangerouslySetInnerHTML={markup}
      >
    </StyledDiv>
  )
}

MarkdownViewer.defaultProps = {
    rawText: '',
    className: '',
};

MarkdownViewer.propTypes = {
    rawText: PropTypes.string,
    className: PropTypes.string,
}

export default MarkdownViewer;