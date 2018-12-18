import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNav = styled.nav`
  background-color: #092d63;
  color: white;
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

const Header = props => {
  const { username, isLogin } = props.userInfo;

  const className = 'menu-item';
  return (
    <StyledNav width={props.width}>
      <div className="container">
        <div className="logo">
            <Link to="/"><h2>REVIEWER</h2></Link>
        </div>
        <ul className="nav-menus">
          <Link className={className} to={'/'}>리뷰하기</Link>
          <Link className={className} to={'/new-quesion'}>질문하기</Link>
          {
            !isLogin ? 
            (<Link className={className} to={'/login'}>로그인</Link>) :
            (<React.Fragment>
              <a className={className}>{username} 님</a>
              <a className={className} onClick={this.onLogoutClick}>로그아웃</a>
            </React.Fragment>)
          }
        </ul>
      </div>
    </StyledNav>
  )
}

export default Header;