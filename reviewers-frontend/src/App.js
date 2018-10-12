import React, { Component } from 'react';
import styled from 'styled-components';
import QuestionDetail from './pages/QuestionDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import NewQuestion from './pages/NewQuestion';

import { Route } from 'react-router-dom';

const StyledDiv = styled.div`
  
`;

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
        <Route path="/question-detail/:qId" component={QuestionDetail}/>
        <Route path="/login" component={Login}/>
        <Route path="/new-question" component={NewQuestion}/>
      </StyledDiv>
    );
  }
}

export default App;
