import React, { Component } from 'react';
import MarkdownViewer from '../MarkdownViewer';
import Textarea from '../Textarea';
import Button from '../Button';
import styled from 'styled-components';

const EDITOR_MENU = 0;
const VIEWER_MENU = 1;

const Styled = styled.div`
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
  }

  .footer {
    padding-top: 10px;
  }
`;

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMenu: EDITOR_MENU,
      input: [
        "# test",
        "# test",
        "# test",
        "# test",
        "# test",
        "# test",
        "# test",
        "# test",
        "# test",
        "# test"
      ].join('\n')
    };
  }

  onTabItemClick(menu) {
    this.setState({
        currentMenu: menu
    });
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
        <div className="contents">
        {
          this.state.currentMenu === EDITOR_MENU ?
          <Textarea
            editor={this.props.editor}
            height={150}
            onChange={value => this.onTextareaChange(value)}
            value={this.state.input}/> :
          <MarkdownViewer
            editor={this.props.editor}
            height={150}
            rawText={this.state.input}/>
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

export default MarkdownEditor;