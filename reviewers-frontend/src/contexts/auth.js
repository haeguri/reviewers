import React, { createContext } from 'react';
import { fetchData } from '../utils/http';
import { BASE_API_URL } from './const';

const BASE_AUTH_API_URL = BASE_API_URL + '/auth';

const { 
  Consumer: AuthConsumer, 
  Provider
} = createContext();


class AuthProvider extends React.Component {
  state = {
    email: '',
    username: '',
    isLogin: false
  }

  actions = {
    join: (data) => {
      return fetchData(BASE_AUTH_API_URL + '/login', 'POST', data)
              .then(json => {
                console.log(this);
                this.setState({
                  email: json.email, 
                  username: json.username,
                  isLogin: true
                });

                return Promise.resolve(json);
              });
    },
    login: (data) => {
      return fetchData(BASE_AUTH_API_URL + '/login', 'POST', data)
              .then(json => {
                console.log(this);
                this.setState({
                  email: json.email, 
                  username: json.username,
                  isLogin: true
                });

                return Promise.resolve(json);
              });
    },
    logout: () => {
      return fetchData(BASE_AUTH_API_URL + '/logout', 'POST')
              .then(response => {
                this.setState({
                  email: '',
                  username: '',
                  isLogin: false
                });

                return Promise.resolve(response);
              });
    }
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

// export default authContext;
export {
  AuthProvider,
  AuthConsumer  
}