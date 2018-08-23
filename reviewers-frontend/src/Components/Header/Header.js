import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentWrapper from '../../containers/ContentWrapper';
import { Link } from 'react-router-dom';

const StyledNav = styled.nav`
    border-bottom: solid 1px #e2e2e2;
    
    .nav-content {
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
    }
`;

const Header = props => (
    <StyledNav>
        <ContentWrapper className="nav-content">
            <div className="logo">
                <h1>Reviewers</h1>
            </div>
            <ul className="nav-menus">
                {props.menuList.map(m => 
                    <Link className="menu-item" key={m.name} to={m.path}>{m.name}</Link>
                )}
            </ul>
        </ContentWrapper>
    </StyledNav>
)

Header.defaultProps = {

};

Header.propTypes = {
        
};

export default Header;