import React from 'react';
import { withRouter } from 'react-router-dom';
import Login from '../components/Login';
import { AuthConsumer } from '../contexts/auth';

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

export default withRouter(LoginConatiner);