import React from 'react';
import marked from 'marked';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDiv = styled.div`
  overflow-y: ${props => props.hasScroll ? 'scroll' : 'visible'};
  height: ${props => props.height ? props.height + 'px' : 'auto'};
  padding: 10px 5px;

  & * {
    margin: 0 0 0.8em 0;
  }

  h1 { font-size: 18px; }
  h2 { font-size: 16px; }
  h3 { font-size: 15px; }
  h4 { font-size: 14px; }
  h5, h6 { font-size: 13px; }
`

const MarkdownViewer = (props) => {
  const { 
    className, 
    rawText, 
    ...others
  } = props;

  const markup = {
    __html: marked(rawText)
  };

  return (
    <StyledDiv 
      className={className}
      dangerouslySetInnerHTML={markup}
      {...others} 
    />
  )
}

MarkdownViewer.defaultProps = {
  rawText: '',
  className: '',
  height: '',
  hasScroll: false
};

MarkdownViewer.propTypes = {
  rawText: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasScroll: PropTypes.bool
};

export default MarkdownViewer;