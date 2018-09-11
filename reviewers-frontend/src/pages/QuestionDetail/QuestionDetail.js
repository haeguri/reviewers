import React, { Component } from 'react';
import Editor from '../../components/Editor';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getSampleCode, getSampleReviewList } from '../../utils/test-utils';
import PageContent from '../../containers/PageContent';
import ReviewList from '../../components/ReviewList';
import MarkdownViewer from '../../components/MarkdownViewer';
import { getSampleMarkdown } from '../../utils/test-utils.js';

const reviewListSize = { height: 600, width: 500};
const sampleCode = getSampleCode() + getSampleCode() + '\nfunction test(){\n return { \n }\n}';

const StyledPageContent = styled(PageContent)`
  overflow: hidden;
  padding: 0 0 20px 40px;
  border-left: solid 1px #a2a2a2;
  border-right: solid 1px #a2a2a2;

  .left {
    width: 600px;
    float: left;

    .title-area {
      border-bottom: solid 1px #e2e2e2;
    }

    .body-area {
      position: relative;
      padding: 20px 0;
      min-height: 60px;

      .toggle-btn {
        position: absolute;
        top: 20px;
        left: -40px;
        height: 20px;
        background: skyblue;
      }
    }
  }

  .right {
    width: 500px;
    float: right;

    .review-list {
      width: 100%;
    }
  }
`;

class QuestionDetail extends Component {
    constructor(props) {
      super(props);
      console.log('props', props);
      console.log('teststst', getSampleReviewList());
      this.state = {
        sampleBody: getSampleMarkdown(),
        showBody: true,
        selectedCodeLine: 0,

        // server data...
        body: getSampleMarkdown()
      };
    }

    onToggleBodyButtonClick() {
      this.setState({
        showBody: !this.state.showBody
      });
    }

    onLineClick(prev, curr) {
      if(prev !== curr) {
        this.setState({
          selectedCodeLine: curr
        });
      }
    }

    render() {
      const { selectedCodeLine, showBody } = this.state;

      let reviewListHeaderMsg;
      if(selectedCodeLine >= 1) {
        reviewListHeaderMsg = `${selectedCodeLine} line reviews`;
      } else {
        reviewListHeaderMsg = 'all of review';
      }

      return (
        <StyledPageContent width={1150}>
          <section className="left">
            <section className="title-area">
              <h1>Code Detail Page!</h1>
            </section>
            <section className="body-area">
              <span 
                className="toggle-btn" 
                onClick={() => this.onToggleBodyButtonClick()}
              >
                <a>{showBody ? '접기' : '열기'}</a>
              </span>
              {
                showBody ? 
                <MarkdownViewer rawText={this.state.sampleBody}/> :
                <span>...</span>
              }
            </section>
            <section className="source-code-area">
              <Editor
                className="editor"
                height={600}
                isReadOnly={true}
                onLineClick={(prev, curr) => this.onLineClick(prev, curr)}
                // react-monaco-editor 옵션
                options={{
                  readOnly: true,
                  glyphMargin: true,
                }}

                value={sampleCode}
              />
            </section>
          </section>
          <section className="right">
            <h3>{reviewListHeaderMsg}</h3>
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