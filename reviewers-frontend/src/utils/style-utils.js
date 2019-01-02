import { css } from 'styled-components';

export const includeBadgeStyle = (...args) => css`
  .badge {
    padding: 5px 7px;
    font-size: 12px;  
    border-radius: 5px;
    border: solid 2px #1162bc;
    color: #1162bc; 
  }

  .badge.active {
    background-color: #1162bc;
    color: #ffffff;
    font-weight: 600;
  }

  ${css(...args)}
`;