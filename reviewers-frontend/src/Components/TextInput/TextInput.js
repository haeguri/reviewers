import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * @TODO
 * - 현재는 함수 컴포넌트로 작성
 * - 라이프 사이클 메서드를 테스트해보기 위해 임시로 클래스 컴포넌트로 작성
 */

const StyledTextarea = styled.textarea`
    display: block;
    height: ${props => props.height}px;
    width: 100%;
    resize: none;
    font-size: 1em;
`;

class TextInput extends Component {
    constructor(props) {
        super(props);
        console.log('[TextInput Component] constructor.');

        this._focusInEventListener = this._focusInEventListener.bind(this);
        this._focusOutEventListener = this._focusOutEventListener.bind(this);
    }

    _focusInEventListener() {
        console.log('disable scroll');
        this.props.editor.updateOptions({
            scrollbar: {
                vertical: 'hidden',
                handleMouseWheel: false
            }
        })
    }

    _focusOutEventListener() {
        console.log('enable scroll');
        this.props.editor.updateOptions({
            scrollbar: {
                vertical: 'visible',
                handleMouseWheel: true
            }
        })
    }

    componentDidMount() {
        this.ref.addEventListener('mouseenter', this._focusInEventListener);
        this.ref.addEventListener('mouseleave', this._focusOutEventListener);

        // setTimeout으로 감싸지 않으면 textInput이 focus되지 않음.
        setTimeout(() => {
            if(this.ref) {
                this.ref.focus();
            }
        }, 0);
        
        console.log('[TextInput Component] did mounted');
    }

    componentDidUpdate() {
        console.log('[TextInput Component] componentDidUpdate');
    }

    componentWillUnmount() {
        this.ref.removeEventListener('mouseenter', this._focusInEventListener);
        this.ref.removeEventListener('mouseleave', this._focusOutEventListener);
        console.log('[TextInput Component] Will Unmount');
    }
    
    render() {
        return (
            <StyledTextarea
                innerRef={element => this.ref= element}
                height={this.props.height}
                onChange={e => this.props.onChange(e.target.value)}
                value={this.props.value}
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