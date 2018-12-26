import React from 'react';
import Join from '../components/Join';
import { AuthConsumer } from '../contexts/auth';

const JoinContainer = ({history}) => (
  <AuthConsumer>
    {
      ({state, actions}) => {
        if(state.isLogin) {
          history.push('/');
        }
        
        return (<Join requestJoin={actions.join}/>)
      }
    }
  </AuthConsumer>
)

export default JoinContainer;