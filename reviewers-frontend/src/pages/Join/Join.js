import React from 'react';
import PageTemplate from '../../templates/PageTemplate';
import JoinContainer from '../../containers/Join';

const JoinPage = (props) => (
  <PageTemplate width={500}>
    <JoinContainer history={props.history}/>
  </PageTemplate>
)

export default JoinPage;