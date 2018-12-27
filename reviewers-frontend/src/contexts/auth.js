import React, { createContext } from 'react';
import { fetchData } from '../utils/http';

const BASE_AUTH_API_URL = '/api/auth';

const { 
  Consumer: AuthConsumer, 
  Provider
} = createContext();

class AuthProvider extends React.Component {
  state = {
    _id: '',
    email: '',
    username: '',
    isLogin: false
  }

  actions = {
    join: (data) => 
      fetchData(BASE_AUTH_API_URL + '/join', 'POST', data)
      .then(json => {
        this.setState({
          _id: json._id,
          email: json.email,
          username: json.username,
          isLogin: true
        });
      
        return Promise.resolve(json);
      })
    ,

    login: (data) => 
      fetchData(BASE_AUTH_API_URL + '/login', 'POST', data)
      .then(json => {
      this.setState({
        _id: json._id,
        email: json.email,
        username: json.username,
        isLogin: true
      });
    
      return Promise.resolve(json);
    })
    ,
  
    logout: () => 
      fetchData(BASE_AUTH_API_URL + '/logout', 'POST')
      .then(response => {
        this.setState({
          _id: '',
          email: '',
          username: '',
          isLogin: false
        });

        return Promise.resolve(response);
      })

  }

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    )
  }
}

function useAuth(WrappedComponent) {
  return (props) => (
    <AuthConsumer>
      {
        ({state, actions}) => (
          <WrappedComponent 
            authInfo={state} 
            authActions={actions} 
            {...props}
          />
        )
      }
    </AuthConsumer>
  )
}

// export default authContext;
export {
  AuthProvider,
  AuthConsumer,
  useAuth,
}