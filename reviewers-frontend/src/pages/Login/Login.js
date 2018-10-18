import React, { Component } from 'react';
import PageContainer from '../../containers/PageContainer';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import styled from 'styled-components';

const StyledPageContainer = styled(PageContainer)`
  padding: 50px 0;

  .login-card {
    padding-top: 50px;
    border: solid 1px #e6e6e6;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1), 
    			      0 3px 1px -2px rgba(0, 0, 0, 0.16), 
                0 1px 5px 0 rgba(0, 0, 0, 0.08);

    .form-header {
      margin: 0;
      text-align: center;
      color: #575757;
      font-size: 30px;
      font-weight: 500;
    }

    .login-form {
      margin: 40px 40px 100px;

      .form-input {
        margin-bottom: 10px;
      }

      .login-btn, .signup-btn {
        width: 100%;
        height: 35px;
        font-size: 18px;
        letter-spacing: 1px;
        margin-bottom: 10px;
      }

      .login-btn {
        background-color: #0d4292;
        color: #fff;
      }

      .signup-btn {
        color: #747474;
      }
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
        <section className="login-card">
          <h2 className="form-header">WELCOME</h2>
          <form className="login-form">
            <TextInput className="form-input" type="text" placeholder="사용자 이이디를 입력하세요." />
            <TextInput className="form-input" type="password" placeholder="비밀번호를 입력하세요." />
            <Button className="login-btn filled">로그인</Button>
            <Button className="signup-btn filled">회원가입</Button>
          </form>
        </section>
      </StyledPageContainer>
    );
  }
}

export default Login;