import React from 'react';
import Login from '../../pages/Login';
import { AuthConsumer } from '../../contexts/auth';

const LoginConatiner = (props) => (
  <AuthConsumer>
    {
      ({actions}) => (
        <Login requestLogin={actions.login}/>
      )
    }
  </AuthConsumer>
);

export default LoginConatiner;