import React, { Component } from 'react';
import Join from '../components/Join';
import { useAuth } from '../contexts/auth';
import { withRouter } from 'react-router-dom';
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
    },
    errors: {
      email: null,
      username: null,
      password: null,
      passwordConfirm: null
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

  setErrorState = (field, msg) => {
    if (msg === null) {
      this.invalidFields.delete(field);
    } else {
      this.invalidFields.add(field);
    }

    this.setState((state) => ({
      errors: {
        ...state.errors,
        [field]: msg
      }
    }))
  }

  onJoinClick = async (e) => {
    const { form: { email, username, password, passwordConfirm } } = this.state;
    const { authActions } = this.props;

    if (!email) {
      this.setErrorState('email', '이메일이 입력되지 않았습니다.');
    } else if (!isValidEmail(email)) {
      this.setErrorState('email', '이메일 형식이 올바르지 않습니다.');
    } else {
      this.setErrorState('email', null);
    }

    if (!username) {
      this.setErrorState('username', '사용자 이름이 입력되지 않았습니다.');
    } else if (!isValidUsername(username)) {
      this.setErrorState('username', '사용자 이름 형식이 올바르지 않습니다.');
    } else {
      this.setErrorState('username', null);
    }

    if (!password) {
      this.setErrorState('password', '비밀번호가 입력되지 않았습니다.');
    } else if (!isValidPassword(password)) {
      this.setErrorState('password', '비밀번호 형식은 4~16자리 영문자, 숫자입니다.');
    } else if (password !== passwordConfirm) {
      this.setErrorState('password', '두 개의 비밀번호가 다릅니다.');
    } else {
      this.setErrorState('password', null);
    }

    if (!passwordConfirm) {
      this.setErrorState('passwordConfirm', '비밀번호가 입력되지 않았습니다.');
    } else if (!isValidPassword(passwordConfirm)) {
      this.setErrorState('passwordConfirm', '비밀번호 형식은 4~16자리 영문자, 숫자입니다.');
    } else {
      this.setErrorState('passwordConfirm', null);
    }

    if (this.invalidFields.size > 0) {
      this.invalidFields.clear();
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
    const { form, errors } = this.state;
    const { authInfo, history } = this.props;

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

export default withRouter(useAuth(JoinContainer));