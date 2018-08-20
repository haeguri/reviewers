import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledNav = styled.nav`
    border-bottom: solid 1px #e2e2e2;

    .container {
        width: 900px;
        margin-left: auto;
        margin-right: auto;
        background: red;
        overflow: hidden;

        .logo {
            background: yellow;
            float: left;
        }

        .nav-menus {
            list-style: none;
            padding-left: 0;
            float: right;

            .menu-item {
                display: inline-block;
                background: yellow;
                margin-right: 10px;

                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }\
`;

const Header = props => (
    <StyledNav>
        <div className="container">
            <div className="logo">
                <h1>Reviewers</h1>
            </div>
            <ul className="nav-menus">
                {props.menuList.map(m => 
                    <li key={m.name} className="menu-item"><a>{m.name}</a></li>
                )}
            </ul>
        </div>
    </StyledNav>
)

Header.defaultProps = {

};

Header.propTypes = {
        
};

export default Header;