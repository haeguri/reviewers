import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../../containers/PageContainer';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import CardForm from '../../components/CardForm';
import styled from 'styled-components';

const StyledPageContainer = styled(PageContainer)`
  padding: 50px 0;

  .login-form {
    margin: 40px 40px 100px;

    .form-input {
      height: 36px;
      margin-bottom: 10px;
    }

    .login-btn, .join-btn {
      width: 100%;
      height: 35px;
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
      <StyledPageContainer width={500}>
        <CardForm 
          className="login-card"
          headerMsg={'WELCOME'}
        >
          <form className="login-form">
            <TextInput className="form-input" type="text" placeholder="사용자 이이디를 입력하세요." />
            <TextInput className="form-input" type="password" placeholder="비밀번호를 입력하세요." />
            <Button type="button" className="login-btn filled">로그인</Button>
            <Link to="/join"><Button className="join-btn filled">회원가입</Button></Link>
          </form>
        </CardForm>
      </StyledPageContainer>
    );
  }
}

export default Login;