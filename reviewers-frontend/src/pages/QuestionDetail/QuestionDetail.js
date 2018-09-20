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

      .body-contents {
        max-height: ${props => props.isBodyFold ? '150px' : 'none'};
        overflow: hidden;
      }

      .toggle-btn {
        position: absolute;
        top: 20px;
        left: -40px;
        background: skyblue;

        .unfold, .fold {
          display: inline-block;
          height: 20px;
          width: 20px;
        }

        .unfold {
          background-color: yellow;
        }

        .fold {
          background-color: red;
        }
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
        isBodyFold: true,
        selectedCodeLine: 0,

        // server data...
        body: getSampleMarkdown()
      };
    }

    onToggleBodyClick() {
      this.setState({
        isBodyFold: !this.state.isBodyFold
      });
    }

    onLineClick(curr) {
      console.log(`onLineClick curr: ${curr}`);
      this.setState({
        selectedCodeLine: curr
      });
    }

    render() {
      const { selectedCodeLine, isBodyFold, sampleBody } = this.state;

      let reviewListHeaderMsg;
      if(selectedCodeLine >= 1) {
        reviewListHeaderMsg = `${selectedCodeLine} line reviews`;
      } else {
        reviewListHeaderMsg = 'all of review';
      }

      return (
        <StyledPageContent width={1150} isBodyFold={isBodyFold}>
          <section className="left">
            <section className="title-area">
              <h1>Code Detail Page!</h1>
            </section>
            <section className="body-area">
              <span className="toggle-btn" 
                    onClick={() => this.onToggleBodyClick()}>
                <a className={isBodyFold ? 'unfold' : 'fold'}><span></span></a>
              </span>
              <MarkdownViewer className="body-contents"
                              rawText={sampleBody}/>
            </section>
            <section className="source-code-area">
              <Editor
                className="editor"
                height={600}
                isReadOnly={true}
                onLineClick={(curr) => this.onLineClick(curr)}
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