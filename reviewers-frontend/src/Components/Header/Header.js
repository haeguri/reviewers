import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const menuList = [
  {
    name: '리뷰하기',
    path: '/'
  },
  {
    name: '질문하기',
    path: '/new-question'
  },
  {
    name: '로그인',
    path: '/login'
  }
];

const StyledNav = styled.nav`
  background-color: #092d63;
  color: white;
  border-bottom: solid 1px #e2e2e2;
  width: 100%;
  height: 50px;
  min-width: ${props => {
    const width = parseInt(props.width, 10);
    return width > 900 ? width : 900;
  }}px;
  
  .container {
    height: 100%;
    width: 900px;
    margin: 0 auto; 
    overflow: hidden;
    display: flex;
    align-items: center;

    .logo h1 { margin: 0; }

    .nav-menus {
      margin-left: auto;
      list-style: none;
      padding-left: 0;

      .menu-item {
        display: inline-block;
        margin-right: 20px;

        &:last-child { margin-right: 0; }
      }
    }
  }
`;

const Header = props => (
  <StyledNav width={props.width}>
    <div className="container">
      <div className="logo">
          <Link to="/"><h2>Reviewers</h2></Link>
      </div>
      <ul className="nav-menus">
          {menuList.map(m => <Link className="menu-item" key={m.name} to={m.path}>{m.name}</Link>)}
      </ul>
    </div>
  </StyledNav>
);

export default Header;