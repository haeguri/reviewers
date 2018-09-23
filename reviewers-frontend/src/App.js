import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import QuestionDetail from './pages/QuestionDetail';
import QuestionList from './pages/QuestionList';
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
        <Route exact path="/" component={QuestionList}/>
        <Route path="/question-detail/:qId" component={QuestionDetail}/>
        <Route path="/login" component={Login}/>
        <Route path="/new-question" component={NewQuestion}/>
        <Footer />
    </StyledDiv>
        );
    }
}

export default App;
