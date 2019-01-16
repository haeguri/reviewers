import React, { Component } from 'react';
import Join from '../components/Join';
import { useAuth } from '../contexts/auth';
import { withRouter } from 'react-router-dom';
import withFormValidation from '../hoc/withFormValidation';
import {
  isValidEmail,
  isValidUsername,
  isValidPassword,
} from '../utils/validation';

class JoinContainer extends Component {
  invalidFields = new Set();

  state = {
    form: {
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    }
  };

  onEmailChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        email: e.target.value
      }
    })
  } 

  onUsernameChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        username: e.target.value
      }
    });
  }

  onPasswordChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        password: e.target.value
      }
    });
  }

  onPasswordConfirmChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        passwordConfirm: e.target.value
      }
    });
  }

  onJoinClick = async (e) => {
    const { 
      form: { 
        email, 
        username,
        password, 
        passwordConfirm 
      } 
    } = this.state;

    const { 
      authActions, 
      validateForm, 
      isValidForm 
    } = this.props;

    validateForm([
      {
        field: 'email',
        tests: [
          [email, '이메일이 입력되지 않았습니다.'],
          [isValidEmail(email), '이메일 형식이 올바르지 않습니다.'],
        ]
      },
      {
        field: 'username',
        tests: [
          [username, '사용자 이름이 입력되지 않았습니다.'],
          [isValidUsername(username), '사용자 이름 형식이 올바르지 않습니다.']
        ]
      },
      {
        field: 'password',
        tests: [
          [password, '비밀번호가 입력되지 않았습니다.'],
          [isValidPassword(password), '비밀번호 형식은 4~16자리 영문자, 숫자입니다.'],
          [password === passwordConfirm, '두 개의 비밀번호가 다릅니다.']
        ]
      },
      {
        field: 'passwordConfirm',
        tests: [
          [passwordConfirm, '비밀번호가 입력되지 않았습니다.'],
          [isValidPassword(passwordConfirm), '비밀번호 형식은 4~16자리 영문자, 숫자입니다.'],
        ]
      }
    ])

    if (!isValidForm()) {
      return;
    }

    try {
      await authActions.join({
        email, username, password
      });
    } catch (err) {
      // 서버 측 에러 처리..
    }
  }

  render = () => {
    const { form } = this.state;
    const { authInfo, history, errors } = this.props;

    if (authInfo.isLogin) {
      history.push('/');
    }

    return (
      <Join
        {...form}
        errors={errors}
        onEmailChange={this.onEmailChange}
        onUsernameChange={this.onUsernameChange}
        onPasswordChange={this.onPasswordChange}
        onPasswordConfirmChange={this.onPasswordConfirmChange}
        onJoinClick={this.onJoinClick}
      />
    )
  }
}

export default withRouter(useAuth(withFormValidation(JoinContainer)));