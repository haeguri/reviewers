import React from 'react';
import { useAuth } from '../contexts/auth';
import Header from '../components/Header';

const HeaderContainer = ({authInfo, authActions, ...others}) => (
  <Header 
    authInfo={authInfo} 
    authActions={authActions}
    {...others}
  />
);

export default useAuth(HeaderContainer);