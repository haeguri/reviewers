import React, { Component } from 'react';
import Editor from '../../components/Editor';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getSampleCode, getSampleReviewList } from '../../utils/test-utils';
import PageContent from '../../containers/PageContent';
import ReviewList from '../../components/ReviewList';
import MarkdownViewer from '../../components/MarkdownViewer';

const reviewListSize = { height: 600, width: 500};
const sampleCode = getSampleCode() + getSampleCode() + '\nfunction test(){\n return { \n }\n}';

const StyledPageContent = styled(PageContent)`
  .left {
    width: 600px;
    float: left;
  }

  .right {
    width: 500px;
    float: right;

    .review-list {
      padding: 0 10px;
      width: ${reviewListSize.width}px;
      height: ${reviewListSize.height}px;
    }
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
        <StyledPageContent width={1100}>
          <section className="left">
            <section className="title-area">
              <h1>Code Detail Page!</h1>
            </section>
            <section className="body-area">
              <MarkdownViewer>

              </MarkdownViewer>
            </section>
            <section className="source-code-area">
              <Editor
                className="editor"
                height={600}
                isReadOnly={true}
                options={{
                  readOnly: true,
                  glyphMargin: true,
                }}
                value={sampleCode}
              />
            </section>
          </section>
          <section className="right">
            <ReviewList 
              className="review-list"
              data={getSampleReviewList()} 
            />
          </section>
          <div></div>
        </StyledPageContent>
      );
    }
}

QuestionDetail.defaultProps = {

};

QuestionDetail.propTypes = {

};



export default QuestionDetail;