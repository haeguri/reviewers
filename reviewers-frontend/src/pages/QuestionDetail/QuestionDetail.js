import React, { Component } from 'react';
import Editor from '../../components/Editor';
import styled from 'styled-components';
import { getSampleCode, getSampleReviewList } from '../../utils/test-utils';
import PageContainer from '../../containers/PageContainer';
import ReviewList from '../../components/ReviewList';
import MarkdownViewer from '../../components/MarkdownViewer';
import { getSampleMarkdown } from '../../utils/test-utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

      .info-badge {
        margin-left: 15px;
        background-color: #1162bc;
        color: white;
        padding: 2px 7px;
        font-size: 12px;
        border-radius: 5px;
      }

      h1 {
        font-size: 20px;
        margin: 0;
      }
    }
  }

  .left {
    width: 600px;
    margin-right: 10px;

    .author {
      color: #646464;
    }

    .updated {
      font-size: 13px;
      color: #9a9b9d;
    }

    .title-area {
      border-bottom: solid 1px #e2e2e2;
    }

    .body-area {
      position: relative;
      padding: 10px 0;

      .meta-info {
        display: flex;
        align-items: center;

        .updated {
          margin-left: 10px;
        }
      }

      .body-contents {
        max-height: ${props => props.isBodyFold ? '150px' : 'none'};
        overflow: hidden;
        margin-top: 20px;
      }

      .toggle-btn {
        position: absolute;
        top: 50px;
        left: -40px;

        svg {
          color: #1162bc;
          font-size: 1.3em;
        }
      }
    }
  }

  .right {
    background-color: #E8EBF0;
    width: 500px;
    padding: 0 10px;
    border-left: solid 1px #d2d2d2;

    .title-area {
      .txt-review-list {
        color: #515151;
        font-weight: 600;
        margin: 0;
      }
    }

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
      const iconToggleBody = isBodyFold ? <FontAwesomeIcon icon='plus-circle'/> :
                                          <FontAwesomeIcon icon='minus-circle'/>;

      let reviewListHeaderMsg;
      if(selectedCodeLine >= 1) {
        reviewListHeaderMsg = `Line ${selectedCodeLine}`;
      } else {
        reviewListHeaderMsg = 'ALL';
      }

      return (
        <StyledPageContainer 
          headerWidth={1150} 
          width={1150}
          isBodyFold={isBodyFold}>
          <section className="left">
            <section className="title-area">
              <h1>새로운 질문...</h1>
            </section>
            <section className="body-area">
              <div className="meta-info">
                <span className="author"><a>Author</a></span>
                <span className="updated">2018-07-01 23:33:11</span>
              </div>
              <div className="author-info">
                
              </div>
              <span
                className="toggle-btn" 
                onClick={() => this.onToggleBodyClick()}>
                <a className="toggle-body-fold">{iconToggleBody}</a>
              </span>
              <MarkdownViewer 
                className="body-contents"
                rawText={sampleBody} />
            </section>
            <section className="source-code-area">
              <Editor 
                className="editor"
                height={600}
                isReadOnly={true}
                onLineClick={(curr) => this.onLineClick(curr)}
                value={sampleCode}
                // react-monaco-editor 옵션
                options={{
                  readOnly: true,
                  glyphMargin: true,
                }} />
            </section>
          </section>
          <section className="right">
            <div className="title-area">
              <span className="txt-review-list">리뷰 목록</span>
              <span className="info-badge">{reviewListHeaderMsg}</span>
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
        </StyledPageContainer>
      );
    }
}

export default QuestionDetail;