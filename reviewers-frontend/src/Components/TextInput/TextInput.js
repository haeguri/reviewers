import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * @TODO
 * - 현재는 함수 컴포넌트로 작성
 * - 라이프 사이클 메서드를 테스트해보기 위해 임시로 클래스 컴포넌트로 작성
 */

const StyledTextarea = styled.textarea`
    height: ${props => props.height}px;
    width: 100%;
    resize: none;
    font-size: 1em;
`

class TextInput extends Component {
    constructor(props) {
        super(props);
        console.log('[TextInput Component] constructor.');
    }

    componentDidMount() {
        // setTimeout으로 감싸지 않으면 textInput이 focus되지 않음.
        setTimeout(() => {
            if(this.textInput) {
                this.textInput.focus();
            }
        }, 0);
        
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
                height={this.props.height}
                onChange={e => this.props.onChange(e.target.value)}
                value={this.props.value}
                innerRef={element => this.textInput = element}
            />
        )
    }
}

TextInput.propTypes = {
    height: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default TextInput;