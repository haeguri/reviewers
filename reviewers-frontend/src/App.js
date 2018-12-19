import React from 'react';
import QuestionDetail from './pages/QuestionDetail';
import Home from './pages/Home';
import LoginContainer from './containers/Login';
import JoinContainer from './containers/Join';
import QuestionNew from './pages/QuestionNew';
import QuestionEdit from './pages/QuestionEdit';
import { Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';

const AppProvider = ({contexts, children}) => contexts.reduce(
  (prev, context) => React.createElement(context, {
    children: prev
  }), 
  children
)

const contexts = [AuthProvider];

const App = () => (
  <AppProvider contexts={contexts}>
    <Route path="/" exact component={Home}/>
    <Route path="/new-question" component={QuestionNew}/>
    <Route path="/edit-question" component={QuestionEdit}/>
    <Route path="/question-detail/:qId" component={QuestionDetail}/>
    <Route path="/login" component={LoginContainer}/>
    <Route path="/join" component={JoinContainer}/>
  </AppProvider>
);

export default App;
