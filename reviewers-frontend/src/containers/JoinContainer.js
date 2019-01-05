import React, { Component } from 'react';
import Join from '../components/Join';
import { useAuth } from '../contexts/auth';
import { withRouter } from 'react-router-dom';

class JoinContainer extends Component {
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
    const { email, username, password, passwordConfirm } = this.state.form;
    const { authActions } = this.props;

    if(password !== passwordConfirm) {
      // 에러처리..
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
    const { authInfo, history } = this.props;

    if (authInfo.isLogin) {
      history.push('/');
    }

    return (
      <Join 
        {...this.state.form}
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