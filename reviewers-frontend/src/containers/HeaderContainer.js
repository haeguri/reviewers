import React from 'react';
import { AuthConsumer } from '../contexts/auth';
import Header from '../components/Header';

const HeaderContainer = (props) => (
  <AuthConsumer>
    {
      ({state, actions}) => (
        <Header userInfo={state} requestLogout={actions.logout} {...props} />
      )
    }
  </AuthConsumer>
);

export default HeaderContainer;