import React from 'react';
import styled from 'styled-components';
import QuestionDetail from './pages/QuestionDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import QuestionNew from './pages/QuestionNew';
import QuestionEdit from './pages/QuestionEdit';

import { Route } from 'react-router-dom';

const App = () => (
  <div>
    <Route path="/" exact component={Home}/>
    <Route path="/new-question" component={QuestionNew}/>
    <Route path="/edit-question" component={QuestionEdit}/>
    <Route path="/question-detail/:qId" component={QuestionDetail}/>
    <Route path="/login" component={Login}/>
    <Route path="/join" component={Join}/>
  </div>
);

export default App;
