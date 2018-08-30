import React, { Component } from 'react';
import Editor from '../../components/Editor';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getSampleCode, getSampleReviewList } from '../../utils/test-utils';
import PageContent from '../../containers/PageContent';
import ReviewList from '../../components/ReviewList';

const editorSize = { height: 600, width: 600};
const reviewListSize = { height: 600, width: 500};
const sampleCode = getSampleCode() + getSampleCode() + '\nfunction test(){\n return { \n }\n}';

const StyledDiv = styled.div`
  .editor,
  .review-list {
    display: inline-block;
  }

  .review-list {
    padding: 0 10px;
    width: ${reviewListSize.width}px;
    height: ${reviewListSize.height}px;
  }
`;

class QuestionDetail extends Component {
    constructor(props) {
      super(props);
      console.log('props', props);
      console.log('teststst', getSampleReviewList());
      this.state = {

      };
    }

    render() {
      console.log(this.props);

      return (
        <PageContent width={1100}>
          <StyledDiv>
            <h1>Code Detail Page!</h1>
            <Editor 
              className="editor"
              width={editorSize.width}
              height={editorSize.height}
              isReadOnly={true}
              options={{
                readOnly: true,
                glyphMargin: true,
              }}
              value={sampleCode}
            />
            <ReviewList 
              className="review-list"
              data={getSampleReviewList()} 
            />
          </StyledDiv>
        </PageContent>
      );
    }
}

QuestionDetail.defaultProps = {

};

QuestionDetail.propTypes = {

};



export default QuestionDetail;