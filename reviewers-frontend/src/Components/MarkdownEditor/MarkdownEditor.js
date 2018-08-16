import React, { Component } from 'react';
import MarkdownViewer from '../MarkdownViewer';
import TextInput from '../TextInput';
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

        .tab-item:nth-child(1) {
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
            input: ''
        };
    }

    onTabItemClick(menu) {
        this.setState({
            currentMenu: menu
        });
    }

    onTextInputChange(input) {
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
                    <TextInput
                        height={150}
                        onChange={value => this.onTextInputChange(value)}
                        value={this.state.input}/> :
                    <MarkdownViewer
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