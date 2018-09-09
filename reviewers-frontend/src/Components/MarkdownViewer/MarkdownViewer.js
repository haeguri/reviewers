import React, { Component } from 'react';
import marked from 'marked';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MarkdownViewer = props => {
  const { className, rawText } = props;
  const markup = {
    __html: marked(rawText)
  };

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={markup}
      >
    </div>
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