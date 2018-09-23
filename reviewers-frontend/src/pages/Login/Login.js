import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PageContainer from '../../containers/PageContainer';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <PageContainer width={500}>
        <h1>Login Page!</h1>
      </PageContainer>
    );
  }
}

Login.defaultProps = {

};

Login.propTypes = {

};

export default Login;