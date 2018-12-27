import React from 'react';
import Join from '../components/Join';
import { AuthConsumer } from '../contexts/auth';
import { withRouter } from 'react-router-dom';

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

export default withRouter(JoinContainer);