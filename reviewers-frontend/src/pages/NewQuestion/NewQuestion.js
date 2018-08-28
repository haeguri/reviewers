import React, { Component } from 'react';
import Editor from '../../components/Editor';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PageContent from '../../containers/PageContent';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { getSampleCode } from '../../utils/test-utils';

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
      <PageContent width={700}>
        <seciton>
          <TextInput />
        </seciton>
        <seciton>
          <Editor 
            width={700}
            height={400}
            value={this.state.code}
            onChange={(newValue, e) => this.onCodeChange(newValue, e)}
          />
        </seciton>
        <section>
          <Button>Save</Button>
          <Button>Cancel</Button>
        </section>
      </PageContent>
    )
  }
}

NewQuestion.defaultProps = {

};

NewQuestion.propTypes = {

};



export default NewQuestion;