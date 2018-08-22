import { css } from 'styled-components';

const sizes = {
    desktop: '900px'
};

export const centerWithAbsSize = device => css`
    width: ${sizes[device]};
    margin-left: auto;
    margin-right: auto;
`;