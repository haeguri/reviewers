import React, { Component } from 'react';
import styled from 'styled-components';
import QuestionDetail from './pages/QuestionDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import QuestionNew from './pages/QuestionNew';
import QuestionEdit from './pages/QuestionEdit';

import { Route } from 'react-router-dom';

/**
 * Test Code..
 */
import axios from 'axios';

axios.post('http://localhost:3030/login', {
  email: 'test2@test.com',
  password: 'qwer1234'
})
.then(response => {
  console.log('success', response);
})
.catch(response => {
  console.log('fail', response);
});


const StyledDiv = styled.div``;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <StyledDiv className="app-container">
        <Route exact path="/" component={Home}/>
        <Route path="/new-question" component={QuestionNew}/>
        <Route path="/edit-question" component={QuestionEdit}/>
        <Route path="/question-detail/:qId" component={QuestionDetail}/>
        <Route path="/login" component={Login}/>
        <Route path="/join" component={Join}/>
      </StyledDiv>
    );
  }
}

export default App;
