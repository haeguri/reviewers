import React from 'react';
import Join from '../../pages/Join';

class JoinContainer extends React.Component {
  onJoinClick = () => {
    // call fetch API for join request
  }

  render() {
    return <Join onJoinClick={this.onJoinClick}/>
  }
}

export default JoinContainer;