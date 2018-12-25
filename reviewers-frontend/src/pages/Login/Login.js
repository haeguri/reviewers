import React from 'react';
import PageTemplate from '../../templates/PageTemplate';
import LoginContainer from '../../containers/Login';

const LoginPage = (props) => (
  <PageTemplate width={500}>
    <LoginContainer history={props.history}/>
  </PageTemplate>
)

export default LoginPage;