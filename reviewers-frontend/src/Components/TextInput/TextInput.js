import React from 'react';
import styled from 'styled-components';

const StyledTextarea = styled.textarea`
    width: 100%;
`
const TextInput = props => (
    <StyledTextarea isMultiline={props.isMultiline} />
)

export default TextInput;