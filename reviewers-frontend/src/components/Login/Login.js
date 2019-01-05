import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import CardTemplate from '../../templates/CardTemplate';

const StyledDiv = styled.div`
  padding: 50px 0;

  .login-form {
    margin: 40px 40px 100px;

    .form-input {
      height: 36px;
      margin-bottom: 20px;
    }

    .login-btn, .join-btn {
      width: 100%;
      height: 40px;
      font-size: 18px;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .login-btn {
      background-color: #0d4292;
      border: solid 1px #072757;
      color: #fff;
    }

    .join-btn {
      color: #747474;
    }
  }
`;

const Login = (props) => {
  const {
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onLoginClick
  } = props;

  return (
    <StyledDiv>
      <CardTemplate className="login-card" headerMsg={'로그인'}>
        <form className="login-form">
          <TextInput
            type="text" 
            className="form-input"
            onChange={onEmailChange}
            value={email}
            placeholder="이메일을 입력하세요."
          />
          <TextInput
            type="password"
            className="form-input"  
            onChange={onPasswordChange}
            value={password}
            placeholder="비밀번호를 입력하세요."
          />
          <Button type="submit" className="login-btn" onClick={onLoginClick}>로그인</Button>
          <Link to="/join"><Button className="join-btn">회원가입</Button></Link>
        </form>
      </CardTemplate>
    </StyledDiv>
  )
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired
}

export default Login;