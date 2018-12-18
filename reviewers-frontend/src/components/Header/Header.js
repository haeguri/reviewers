import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNav = styled.nav`
  background-color: #092d63;
  border-bottom: solid 1px #e2e2e2;
  width: 100%;
  height: 50px;
  width: ${props => props.width}px;

  @media screen and (min-width: ${props => props.width}px) {
    width: 100%;
  }
  
  .container {
    height: 100%;
    width: 900px;
    margin: 0 auto; 
    padding: 0 5px;
    overflow: hidden;
    display: flex;
    align-items: center;

    .logo h2 { margin: 0; color: #fff; }

    .nav-menus {
      margin-left: auto;
      list-style: none;
      padding-left: 0;

      .menu-item {
        color: #e5e5e5;        
        display: inline-block;
        margin-right: 20px;

        &.active { color: #fff; font-weight: 700;}
        &:last-child { margin-right: 0; }
      }
    }
  }
`;

const Header = props => {
  const { userInfo: { username, isLogin }, requestLogout } = props;

  const className = 'menu-item';
  return (
    <StyledNav width={props.width}>
      <div className="container">
        <div className="logo">
            <NavLink to="/"><h2>REVIEWER</h2></NavLink>
        </div>
        <ul className="nav-menus">
          <NavLink className={className} activeClassName="active" exact to={'/'}>리뷰하기</NavLink>
          <NavLink className={className} activeClassName="active" to={'/new-question'}>질문하기</NavLink>
          {
            !isLogin ? 
            (<NavLink className={className} activeClassName="active" to={'/login'}>로그인</NavLink>) :
            (<React.Fragment>
              <a className={className}>{username} 님</a>
              <a className={className} onClick={requestLogout}>로그아웃</a>
            </React.Fragment>)
          }
        </ul>
      </div>
    </StyledNav>
  )
}

export default Header;