import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
    &.default {
        border: solid 1px black;
        padding: 5px 10px;
    }
`

const Button = (props) => {
    return (
        <StyledButton
            {...props}
            className={'btn ' + props.className}>
            { props.children }
        </StyledButton>
    );
}

Button.defaultProps = {
    className: 'default'
}


Button.propTypes = {
    className: PropTypes.string
}

export default Button;