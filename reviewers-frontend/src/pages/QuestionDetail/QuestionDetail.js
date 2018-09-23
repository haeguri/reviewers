import React, { Component } from 'react';
import Editor from '../../components/Editor';
import styled from 'styled-components';
import { getSampleCode, getSampleReviewList } from '../../utils/test-utils';
import PageContainer from '../../containers/PageContainer';
import ReviewList from '../../components/ReviewList';
import MarkdownViewer from '../../components/MarkdownViewer';
import { getSampleMarkdown } from '../../utils/test-utils.js';

const sampleCode = getSampleCode() + getSampleCode() + '\nfunction test(){\n return { \n }\n}';

const StyledPageContainer = styled(PageContainer)`
  overflow: hidden;
  padding-left: 40px;
  display: flex;
  flex-direction: row;

  .left, .right {
    .title-area {
      display: flex;
      align-items: center;
      height: 50px;
      overflow: hidden;
      border-bottom: solid 1px #b2b5b8;

      h1 {
        margin: 0;
      }
    }
  }

  .left {
    width: 600px;
    margin-right: 10px;

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
    background-color: #E8EBF0;
    width: 500px;
    padding: 0 10px;
    border-left: solid 1px #d2d2d2;

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
        <StyledPageContainer 
          headerWidth={1150} width={1150}
          isBodyFold={isBodyFold}>

          <section className="left">
            <section className="title-area">
              <h1>Code Detail Page!</h1>
            </section>
            <section className="body-area">
              <span className="toggle-btn" 
                onClick={() => this.onToggleBodyClick()}
              >
                <a className={isBodyFold ? 'unfold' : 'fold'}><span></span></a>
              </span>
              <MarkdownViewer className="body-contents"
                rawText={sampleBody}
              />
            </section>
            <section className="source-code-area">
              <Editor className="editor"
                height={600}
                isReadOnly={true}
                onLineClick={(curr) => this.onLineClick(curr)}
                value={sampleCode}
                // react-monaco-editor 옵션
                options={{
                  readOnly: true,
                  glyphMargin: true,
                }}
              />
            </section>
          </section>
          <section className="right">
            <div className="title-area">
              <p>리뷰 목록</p>
              <span>{reviewListHeaderMsg}</span>
            </div>
            <ReviewList className="review-list"
              data={(_=>{
                const reviewList = getSampleReviewList();

                if(selectedCodeLine === 0) {
                  return reviewList;
                } else {
                  return reviewList.filter(r => r.lineNumber === selectedCodeLine);
                }
              })()} 
            />
          </section>
          <div></div>
        </StyledPageContainer>
      );
    }
}

export default QuestionDetail;