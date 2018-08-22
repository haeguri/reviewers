import { css } from 'styled-components';

const sizes = {
    
};

export const centerWithAbsSize = device => css`
    width: ${sizes[device]};
    margin-left: auto;
    margin-right: auto;
`;