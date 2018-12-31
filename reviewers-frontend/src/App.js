import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import QuestionDetailPage from './pages/QuestionDetailPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import QuestionNewPage from './pages/QuestionNewPage';
import QuestionEditPage from './pages/QuestionEditPage';
import { AuthProvider } from './contexts/auth';
import { ReviewProvider } from './contexts/review';

const AppProvider = ({contexts, children}) => contexts.reduce(
  (prev, context) => React.createElement(context, {
    children: prev
  }), 
  children
)

const contexts = [ReviewProvider, AuthProvider];

const App = () => (
  <AppProvider contexts={contexts}>
    <Route 
      path="/" exact 
      component={HomePage}
    />
    <ProtectedRoute
      onlyUser
      path="/new-question" 
      component={QuestionNewPage}
    />
    <ProtectedRoute 
      onlyUser
      path="/edit-question/:qId" 
      component={QuestionEditPage}
    />
    <Route
      path="/question-detail/:qId" 
      component={QuestionDetailPage}
    />
    <ProtectedRoute
      anonymous 
      path="/login" 
      component={LoginPage}
    />
    <ProtectedRoute 
      anonymous
      path="/join" 
      component={JoinPage}
    />
  </AppProvider>
);

export default App;
