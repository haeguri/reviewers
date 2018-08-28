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

const menuList = [
  {
    name: 'Questions',
    path: '/'
  },
  {
    name: 'New Question',
    path: '/new-question'
  },
  {
    name: 'Login',
    path: '/login'
  }
]
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <StyledDiv className="app-container">
        <Header menuList={menuList}/>
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
