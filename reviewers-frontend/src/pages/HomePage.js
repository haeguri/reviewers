import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import QuestionTableContainer from '../containers/QuestionTableContainer';
import styled from 'styled-components';

const StyledPageTemplate = styled(PageTemplate)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const HomePage = (props) => {
  return (
    <StyledPageTemplate width={1000}>
      <QuestionTableContainer />
    </StyledPageTemplate>
  );
}

export default HomePage;