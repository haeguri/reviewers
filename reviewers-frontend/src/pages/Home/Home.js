import React, { Component } from 'react';
import PageTemplate from '../../templates/PageTemplate';
import QuestionTableContainer from '../../containers/QuestionTable/QuestionTableContainer';
import styled from 'styled-components';

const StyledPageConatiner = styled(PageTemplate)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <StyledPageConatiner width={1000}>
        <QuestionTableContainer />
      </StyledPageConatiner>
    );
  }
}

export default Home;