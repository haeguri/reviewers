import React from 'react';
import QuestionDetailPage from './pages/QuestionDetailPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import QuestionNewPage from './pages/QuestionNewPage';
import QuestionEditPage from './pages/QuestionEditPage';
import { Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import { ReviewProvider } from './contexts/review';

const AppProvider = ({contexts, children}) => contexts.reduce(
  (prev, context) => React.createElement(context, {
    children: prev
  }), 
  children
)

const contexts = [AuthProvider, ReviewProvider];

const App = () => (
  <AppProvider contexts={contexts}>
    <Route path="/" exact component={HomePage}/>
    <Route path="/new-question" component={QuestionNewPage}/>
    <Route path="/edit-question/:qId" component={QuestionEditPage}/>
    <Route path="/question-detail/:qId" component={QuestionDetailPage}/>
    <Route path="/login" component={LoginPage}/>
    <Route path="/join" component={JoinPage}/>
  </AppProvider>
);

export default App;
