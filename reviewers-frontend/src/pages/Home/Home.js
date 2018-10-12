import React, { Component } from 'react';
import PageContainer from '../../containers/PageContainer';
import QuestionTable from '../../components/QuestionTable';
import styled from 'styled-components';

const StyledPageConatiner = styled(PageContainer)`
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
        <QuestionTable />
      </StyledPageConatiner>
    );
  }
}

export default Home;