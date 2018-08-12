import React, { Component } from 'react';
import marked from 'marked';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * @TODO
 * - 현재는 함수 컴포넌트로 작성
 * - 라이프 사이클 메서드를 테스트해보기 위해 임시로 클래스 컴포넌트로 작성
 */

const StyledDiv = styled.div`
    height: ${props => props.height}px;
    border: solid 1px black;
    overflow-y: scroll;
`

class MarkdownViewer extends Component {
    constructor(props) {
        super(props);
        console.log('[MarkdownViewer Component] constructor.');
    }

    componentDidMount() {
        console.log('[MarkdownViewer Component] did mounted');
    }

    componentDidUpdate() {
        console.log('[MarkdownViewer Component] componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('[MarkdownViewer Component] Will Unmount');
    }

    render() {
        const markup = {
            __html: marked(this.props.rawText)
        }
        return (
            <StyledDiv height={this.props.height} dangerouslySetInnerHTML={markup}>
            </StyledDiv>
        )
    }
}

MarkdownViewer.defaultProps = {
    rawText: ''
};

MarkdownViewer.propTypes = {
    rawText: PropTypes.string,
    height: PropTypes.number
}

export default MarkdownViewer;