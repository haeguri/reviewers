import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Login from '../components/Login';
import { useAuth } from '../contexts/auth';
import { isValidEmail, isValidPassword } from '../utils/validation';

class LoginContainer extends Component {
  hasValidForm = true;

  state = {
    form: {
      email: '',
      password: ''
    },
    errors: {
      email: null,
      password: null
    }
  }

  onEmailChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        email: e.target.value
      }
    })
  }

  onPasswordChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        password: e.target.value
      }
    });
  }

  setErrorState = (field, msg) => {
    this.hasValidForm = false;
    this.setState((state) => ({
      errors: {
        ...state.errors,
        [field]: msg
      }
    }))
  }

  onLoginClick = async (e) => {
    const { form } = this.state;

    if (!form.email) {
      this.setErrorState('email', '이메일이 입력되지 않았습니다.');
    } else if (!isValidEmail(form.email)) {
      this.setErrorState('email', '이메일 형식이 올바르지 않습니다.');
    }

    if (!form.password) {
      this.setErrorState('password', '비밀번호가 입력되지 않았습니다.');
    } else if (!isValidPassword(form.password)) {
      this.setErrorState('password', '비밀번호 형식은 6~16자리 영문자, 숫자입니다.');
    }

    if (!this.hasValidForm) {
      this.hasValidForm = true;
      return;
    }

    const { authActions, history } = this.props;
    try {
      await authActions.login(this.state.form);
      history.push('/');
    } catch (err) {
      // 서버 측 에러 처리
    }
  }

  render = () => {
    const { form, errors } = this.state;
    const { history, authInfo } = this.props;

    if (authInfo.isLogin) {
      history.push('/');
    }

    return (
      <Login 
        errors={errors}
        email={form.email}
        password={form.password}
        onEmailChange={this.onEmailChange}
        onPasswordChange={this.onPasswordChange}
        onLoginClick={this.onLoginClick}
      />
    )
  }
}

export default withRouter(useAuth(LoginContainer));