import React, { Component } from 'react';
import Editor from '../../components/Editor';
import styled from 'styled-components';
import PageContainer from '../../containers/PageContainer';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { getSampleCode } from '../../utils/test-utils';

const StyledPageContainer = styled(PageContainer)`
  .input-title {
    width: 100%;
  }

  .input-body {
    width: 100%;
  }
`;

class NewQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: getSampleCode()
    };
  }

  onCodeChange(newValue, e) {
    this.setState({
      code: newValue
    });

    console.log('write editor on change', newValue, e);
  }

  render() {
    return (
      <StyledPageContainer width={700}>
        <section className="input-group">
          <label>제목</label>
          <TextInput 
            className="input-title"
          />
        </section>
        <section className="input-group">
          <label>본문</label>
          <TextInput 
            className="input-body" 
            multiline={true} 
          />
        </section>
        <section className="input-group">
          <label>소스코드</label>
          <Editor 
            width={700}
            height={400}
            value={this.state.code}
            onChange={(newValue, e) => this.onCodeChange(newValue, e)}
          />
        </section>
        <section>
          <Button>저장</Button>
          <Button>취소</Button>
        </section>
      </StyledPageContainer>
    )
  }
}

NewQuestion.defaultProps = {

};

NewQuestion.propTypes = {

};



export default NewQuestion;