import React, { Component } from 'react';
import PageTemplate from '../templates/PageTemplate';
import QuestionForm from '../components/QuestionForm';
import QuestionFormContainer from '../containers/QuestionFormContainer';

const questioNewPage = (props) => (
  <PageTemplate width={1200}>
    <QuestionFormContainer />
  </PageTemplate>
);

export default questioNewPage;