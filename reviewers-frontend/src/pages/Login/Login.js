import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PageContent from '../../containers/PageContent';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <PageContent
        width={500}>
        <h1>Login Page!</h1>
      </PageContent>
    );
  }
}

Login.defaultProps = {

};

Login.propTypes = {

};

export default Login;