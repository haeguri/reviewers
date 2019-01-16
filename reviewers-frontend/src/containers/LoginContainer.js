import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Login from '../components/Login';
import { useAuth } from '../contexts/auth';
import { isValidEmail } from '../utils/validation';
import withFormValidation from '../hoc/withFormValidation';

class LoginContainer extends Component {
  state = {
    form: {
      email: '',
      password: ''
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

  onLoginClick = async (e) => {
    const { 
      form: { 
        email, 
        password 
      } 
    } = this.state;

    const { 
      authActions,
      validateForm,
      isValidForm,
    } = this.props;

    validateForm([
      {
        field: 'email',
        tests: [
          [email, '이메일이 입력되지 않았습니다.'],
          [isValidEmail(email), '이메일 형식이 올바르지 않습니다.']
        ]
      },
      {
        field: 'password',
        tests: [
          [password, '비밀번호가 입력되지 않았습니다.']
        ]
      }
    ])

    if (!isValidForm()) {
      return;
    }

    try {
      await authActions.login(this.state.form);
    } catch (err) {
      // 서버 측 에러 처리
    }
  }

  render = () => {
    const { form } = this.state;
    const { history, authInfo, errors } = this.props;

    if (authInfo.isLogin) {
      history.push('/');
    }

    return (
      <Login 
        {...form}
        errors={errors}
        onEmailChange={this.onEmailChange}
        onPasswordChange={this.onPasswordChange}
        onLoginClick={this.onLoginClick}
      />
    )
  }
}

export default withRouter(useAuth(withFormValidation(LoginContainer)));