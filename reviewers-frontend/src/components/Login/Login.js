import React, { Component } from 'react';
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
      margin-bottom: 10px;
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

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  onEmailChange = (e) => {
    this.setState({email: e.target.value})
  } 

  onPasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  onLoginClick = (e) => {
    const { email, password } = this.state;
    this.props.requestLogin({email, password});
  }

  render() {
    return (
      <StyledDiv>
        <CardTemplate className="login-card" headerMsg={'로그인'}>
          <form className="login-form">
            <TextInput
              type="text" 
              className="form-input"
              onChange={this.onEmailChange}
              value={this.state.email}
              placeholder="이메일을 입력하세요."
            />
            <TextInput
              type="password"
              className="form-input"  
              onChange={this.onPasswordChange}
              value={this.state.password}
              placeholder="비밀번호를 입력하세요."
            />
            <Button type="submit" className="login-btn" onClick={this.onLoginClick}>로그인</Button>
            <Link to="/join"><Button className="join-btn">회원가입</Button></Link>
          </form>
        </CardTemplate>
      </StyledDiv>
    );
  }
}

Login.propTypes = {
  requestLogin: PropTypes.func.isRequired
}

export default Login;