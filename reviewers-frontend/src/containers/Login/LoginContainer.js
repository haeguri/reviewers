import React from 'react';
import Login from '../../pages/Login';
import { AuthConsumer } from '../../contexts/auth';

const LoginConatiner = ({history}) => (
  <AuthConsumer>
    {
      ({state, actions}) => {
        if(state.isLogin) {
          history.push('/');
        }
        
        return (<Login requestLogin={actions.login}/>)
      }
    }
  </AuthConsumer>
);

export default LoginConatiner;