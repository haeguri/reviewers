import React from 'react';
import { useAuth } from '../contexts/auth';
import Header from '../components/Header';

const HeaderContainer = ({authInfo, authActions}) => (
  <Header authInfo={authInfo} authActions={authActions}/>
);

export default useAuth(HeaderContainer);