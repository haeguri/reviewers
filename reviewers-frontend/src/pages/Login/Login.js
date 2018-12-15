import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import CardTemplate from '../../templates/CardTemplate';
import styled from 'styled-components';

const StyledPageTemplate = styled(PageTemplate)`
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
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <StyledPageTemplate width={500}>
        <CardTemplate className="login-card" headerMsg={'REVIEWER'}>
          <form className="login-form">
            <TextInput className="form-input" type="text" placeholder="이메일을 입력하세요." />
            <TextInput className="form-input" type="password" placeholder="비밀번호를 입력하세요." />
            <Button type="button" className="login-btn filled">로그인</Button>
            <Link to="/join"><Button className="join-btn filled">회원가입</Button></Link>
          </form>
        </CardTemplate>
      </StyledPageTemplate>
    );
  }
}

export default Login;