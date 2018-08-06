import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MarkdownEditor from '../MarkdownEditor';
import MarkdownViewer from '../MarkdownViewer';

const StyledWrapper = styled.div`
    height: 100%;
    border: solid 1px #c2c2c2;
    padding: 15px;

    textarea {
        height: 150px;
        width: 100%;
    }
`;

const EDITOR_TAB_ID = 0;
const VIEWER_TAB_ID = 1;

class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTabId: EDITOR_TAB_ID
        };

    }

    changeTab(tabId) {
        this.setState({
            currentTabId: tabId
        });
    }

    render() {
        const { currentTabId } = this.state;

        return (
            <StyledWrapper>
                <ul className="tab-menu">
                    <li><a onClick={() => this.changeTab(EDITOR_TAB_ID)}>Editor</a></li>
                    <li><a onClick={() => this.changeTab(VIEWER_TAB_ID)}>Preview</a></li>
                </ul>
                {
                    currentTabId === EDITOR_TAB_ID ?
                    <MarkdownEditor></MarkdownEditor> :
                    <MarkdownViewer></MarkdownViewer>
                }
                <button onClick={() => this.props.onCancelClick()}>Close Button</button>
            </StyledWrapper>
        )
    }
}

export default Review;

Review.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    onCancelClick: PropTypes.func
};