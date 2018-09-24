import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarkdownViewer from '../MarkdownViewer';
import TextInput from '../TextInput';
import Button from '../Button';
import styled from 'styled-components';
import { getSampleMarkdown } from '../../utils/test-utils';

const EDITOR_MENU = 0;
const VIEWER_MENU = 1;

const Styled = styled.div`
  height: 100%;
  padding: 15px;
  border: solid 1px #c2c2c2;

  .tab-menu {
    overflow: hidden;
    padding: 0;
    list-style: none;
    margin-top: 0;

    .tab-item {
      color: #a2a2a2;
      float: left;
      margin-left: 5px;
    }

    .tab-item:first-child {
      margin-left: 0;
    }

    .tab-item.active {
      color: inherit;
    }
  }

  .contents {
    font-size: 12px;
    height: 150px;

    .md-viewer, .md-input {
      width: 100%;
      height: 100%;
    }

    .md-viewer {
      border: solid 1px black;
    }
  }

  .footer {
    padding-top: 10px;
  }
`;

class ReviewEditor extends Component {
  state = {
    currentMenu: EDITOR_MENU,
    input: getSampleMarkdown()
  }

  constructor(props) {
    super(props);

    this.contentsRef = React.createRef();

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
    this.contentsRef.current.addEventListener('mouseenter', this._mouseEnterEventListener);
    this.contentsRef.current.addEventListener('mouseleave', this._mouseLeaveEventListener);
  }

  componentWillUnmount() {
    this.contentsRef.current.removeEventListener('mouseenter', this._mouseEnterEventListener);
    this.contentsRef.current.removeEventListener('mouseleave', this._mouseLeaveEventListener);
  }

  onTabItemClick(menu) {
    this.setState({ currentMenu: menu });
  }

  onTextareaChange(input) {
    this.setState({ input });
  }

  onSaveClick() {

  }

  render() {
    return (
      <Styled>
        <ul className="tab-menu">
          <li className={'tab-item' + (this.state.currentMenu === EDITOR_MENU ? ' active' : '')}>
            <a onClick={() => this.onTabItemClick(EDITOR_MENU)}>Editor</a>
          </li>
          <li className={'tab-item' + (this.state.currentMenu === VIEWER_MENU ? ' active' : '')}>
            <a onClick={() => this.onTabItemClick(VIEWER_MENU)}>Viewer</a>
          </li>
        </ul>
        <div className="contents"
          ref={this.contentsRef}>
        {
          this.state.currentMenu === EDITOR_MENU ?
          <TextInput className="md-input"
            multiline={true}
            editor={this.props.editor}
            onChange={value => this.onTextareaChange(value)}
            value={this.state.input}
          /> :
          <MarkdownViewer className="md-viewer"
            editor={this.props.editor}
            rawText={this.state.input}
          />
        }
        </div>
        <div className="footer">
          <Button onClick={() => this.onSaveClick()}>Save</Button>
          <Button onClick={() => this.props.onCancelClick()}>Cancel</Button>
        </div>
      </Styled>
    );
  }
}

ReviewEditor.propTypes = {
  editor: PropTypes.object,
  height: PropTypes.number,
  width: PropTypes.number,
  onCancelClick: PropTypes.func
};

export default ReviewEditor;