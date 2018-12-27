import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import LoginContainer from '../containers/LoginContainer';

const LoginPage = (props) => (
  <PageTemplate width={500}>
    <LoginContainer />
  </PageTemplate>
)

export default LoginPage;