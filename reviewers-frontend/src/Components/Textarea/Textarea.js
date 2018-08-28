import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTextarea = styled.textarea`
    display: block;
    height: ${props => props.height}px;
    width: 100%;
    resize: none;
    font-size: 1em;
`;

class Textarea extends Component {
    constructor(props) {
        super(props);
        console.log('[TextInput Component] constructor.');

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
        this.ref.addEventListener('mouseenter', this._mouseEnterEventListener);
        this.ref.addEventListener('mouseleave', this._mouseLeaveEventListener);

        // monaco editor  textInput이 focus되지 않음.
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
                innerRef={element => this.ref = element}
                height={this.props.height}
                onChange={e => this.props.onChange(e.target.value)}
                value={this.props.value}
            />
        )
    }
}

Textarea.propTypes = {
    height: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default Textarea;