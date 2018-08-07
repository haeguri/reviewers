import React, { Component } from 'react';
import MarkdownViewer from '../MarkdownViewer';
import TextInput from '../TextInput';
import styled from 'styled-components';

const EDITOR_MENU = 0;
const VIEWER_MENU = 1;

const Styled = styled.div`
    .tab-menu {
        overflow: hidden;

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
`;

class MarkdownEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentMenu: EDITOR_MENU
        };
    }

    onTabItemClick(menu) {
        this.setState({
            currentMenu: menu
        });
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
                {
                    this.state.currentMenu === EDITOR_MENU ?
                    <TextInput isMultiline={true} /> :
                    <MarkdownViewer />
                }
            </Styled>
        );
    }
}

export default MarkdownEditor;