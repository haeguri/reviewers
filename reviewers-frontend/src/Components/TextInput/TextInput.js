import React, { Component } from 'react';
import styled from 'styled-components';

/**
 * @TODO
 * - 현재는 함수 컴포넌트로 작성
 * - 라이프 사이클 메서드를 테스트해보기 위해 임시로 클래스 컴포넌트로 작성
 */

const StyledTextarea = styled.textarea`
    width: 100%;
`

class TextInput extends Component {
    constructor(props) {
        super(props);
        console.log('[TextInput Component] constructor.');
    }

    componentDidMount() {
        console.log('[TextInput Component] did mounted');
    }

    componentDidUpdate() {
        console.log('[TextInput Component] componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('[TextInput Component] Will Unmount');
    }
    
    render() {
        return (
            <StyledTextarea 
                isMultiline={this.props.isMultiline}
                onChange={e => this.props.onChange(e.target.value)}
            />
        )
    }
}

export default TextInput;