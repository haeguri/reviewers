import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Login from '../components/Login';
import { useAuth } from '../contexts/auth';

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
    const { authActions, history } = this.props;
    try {
      await authActions.login(this.state.form);
      history.push('/');
    } catch (err) {
      // 서버 측 에러 처리
    }
  }

  render = () => {
    const { form } = this.state;
    const { history, authInfo } = this.props;

    if (authInfo.isLogin) {
      history.push('/');
    }

    return (
      <Login 
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