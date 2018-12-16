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
    login: (data) => {
      return fetchData(BASE_AUTH_API_URL + '/login', 'POST', data)
        .then(json => {
          this.setState({
            email: json.email, 
            username: json.username,
            isLogin: true
          });

          console.log(json);

          return Promise.resolve(json);
        });
    },
    logout: () => {
      return fetchData(BASE_AUTH_API_URL + '/logut', 'POST');
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