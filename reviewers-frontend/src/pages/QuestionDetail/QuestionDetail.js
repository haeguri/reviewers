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

  .language-badge, .line-info {
    padding: 2px 7px;
    font-size: 12px;
    border-radius: 5px;
  }

  .language-badge { 
    border: solid 2px #1162bc;
    color: #1162bc;
    margin-left: 15px;
    margin-bottom: 5px;
  }

  .line-info.active {
    background-color: #1162bc;
    color: white;
    font-weight: 600;
  }

  .line-info {
    background-color: white;
    color: #1162bc;
  }

  .left, .right {
    .title-area {
      display: flex;
      align-items: center;
      height: 50px;
      overflow: hidden;
      border-bottom: solid 1px #b2b5b8;

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

      .line-info {
        margin-left: 15px;
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
      selectedCodeLine: -1,

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
    let reviewListHeaderMsg;
    const { selectedCodeLine, isBodyFold, sampleBody } = this.state;
    const iconToggleBody = isBodyFold ? <FontAwesomeIcon icon='plus-circle'/> :
                                        <FontAwesomeIcon icon='minus-circle'/>;

    if(selectedCodeLine >= 1) {
      reviewListHeaderMsg = `Line ${selectedCodeLine}`;
    }

    return (
      <StyledPageContainer 
        headerWidth={1150} 
        width={1150}
        isBodyFold={isBodyFold}>
        <section className="left">
          <section className="title-area">
            <h1>새로운 질문...</h1>
            <span className="language-badge">JavaScript</span>
          </section>
          <section className="body-area">
            <div className="meta-info">
              <span className="author"><a>Author</a></span>
              <span className="updated">2018-07-01 23:33:11</span>
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
            <span 
              className={`line-info ${selectedCodeLine === -1 ? ' active' : ''}`}
              onClick={() => this.onLineClick(-1)}
            >ALL</span>
            {selectedCodeLine < 0 ?
             null :
             <span className={`line-info ${selectedCodeLine >= 0 ? ' active' : ''}`}>{reviewListHeaderMsg}</span>}
          </div>
          <ReviewList className="review-list"
            data={(_=>{
              const reviewList = getSampleReviewList();
              if(selectedCodeLine > 0) {
                return reviewList.filter(r => r.lineNumber === selectedCodeLine);
              } else {
                return reviewList;
              }
            })()} 
          />
        </section>
      </StyledPageContainer>
    );
  }
}

export default QuestionDetail;