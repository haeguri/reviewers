import React, { Component } from 'react';
import PageContainer from '../../containers/PageContainer';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <PageContainer width={500}>
        <h1>Login Page!</h1>
      </PageContainer>
    );
  }
}

export default Login;