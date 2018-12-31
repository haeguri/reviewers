import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

const ProtectedRoute = ({
    anonymous, 
    onlyUser,
    authInfo: { isLogin }, 
    component: Component, 
    ...others
  }) => {
    const renderProp = (props) => {
      let nextComponent

      if (anonymous && isLogin) {
        nextComponent = <Redirect to="/" />;
      } else if (onlyUser && !isLogin) {
        nextComponent = <Redirect to="/login" />;
      } else {
        nextComponent = <Component {...props} />
      }

      return nextComponent;
    }

    return (
      <Route 
        render={renderProp}
        {...others}
      />
    );
}

export default useAuth(ProtectedRoute);