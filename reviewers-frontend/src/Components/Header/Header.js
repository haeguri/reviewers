import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNav = styled.nav`
  border-bottom: solid 1px #e2e2e2;
  
  .container {
    width: 900px;
    margin: 0 auto; 
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
    <div className="container">
      <div className="logo">
          <Link to="/"><h1>Reviewers</h1></Link>
      </div>
      <ul className="nav-menus">
          {props.menuList.map(m => <Link className="menu-item" key={m.name} to={m.path}>{m.name}</Link>)}
      </ul>
    </div>
  </StyledNav>
)

Header.defaultProps = {

};

Header.propTypes = {
        
};

export default Header;