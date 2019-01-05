import React, { Component } from 'react';
import Join from '../components/Join';
import { useAuth } from '../contexts/auth';
import { withRouter } from 'react-router-dom';
import {
  isValidEmail,
  isvalidUsername
} from '../utils/validation';

class JoinContainer extends Component {
  hasValidForm = false;
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
      this.hasValidForm = true;
    } else {
      this.hasValidForm = false;
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
    } else if (!isvalidUsername(username)) {
      this.setErrorState('username', '사용자 이름 형식이 올바르지 않습니다.');
    } else {
      this.setErrorState('username', null);
    }

    if (!password) {
      this.setErrorState('password', '비밀번호가 입력되지 않았습니다.');
    } else if (password !== passwordConfirm) {
      this.setErrorState('password', '두 개의 비밀번호가 다릅니다.');
    } else {
      this.setErrorState('password', null);
    }

    if (!this.hasValidForm) {
      this.hasValidForm = true;
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