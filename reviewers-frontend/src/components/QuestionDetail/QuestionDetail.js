import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Editor from '../Editor';
import ReviewList from '../ReviewList';
import MarkdownViewer from '../MarkdownViewer';
import { getSampleCode, getSampleReviewList } from '../../utils/test-utils';

// const sampleCode = getSampleCode() + getSampleCode() + '\nfunction test(){\n return { \n }\n}';
// const reviewList = getSampleReviewList();
// const reviewCounts = (_=>{
//   return reviewList.reduce((counts, review) => {
//     const lineNumber = review.lineNumber;
//     counts[lineNumber] = counts[lineNumber] ? counts[lineNumber] + 1 : 1;
//     return counts;
//   }, {});
// })();

const StyledSection = styled.section`
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
    cursor: pointer;
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

    .meta-info-area {
      display: flex;
      align-items: center;
      height: 30px;

      .updated {
        margin-left: 10px;
      }
    }

    .button-area {
      font-size: 18px;
      color: #c2c2c2;
    }

    .body-area {
      position: relative;
      padding: 10px 0;

      .body-contents {
        max-height: ${props => props.isBodyFold ? '200px' : 'none'};
        overflow: hidden;
      }

      .toggle-btn {
        position: absolute;
        top: 20px;
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

const QuestionDetail = (props) => {
  let reviewListHeaderMsg;
  const {
    reviewCounts,
    selectedCodeLine, 
    isBodyFold, 
    data: {
      title,
      created,
      language,
      body, 
      sourceCode, 
      reviews,

    },
    onLineClick,
    onToggleBodyClick
  } = this.props;

  const iconToggleBody = isBodyFold ? <FontAwesomeIcon icon='plus-circle'/> :
                                      <FontAwesomeIcon icon='minus-circle'/>;

  if(selectedCodeLine >= 1) {
    reviewListHeaderMsg = `Line ${selectedCodeLine}`;
  }

  return (
    <StyledSection isBodyFold={isBodyFold}>
      <section className="left">
        <section className="title-area">
          <h1>{title}</h1>
          <span className="language-badge">{language}</span>
        </section>
        <section className="meta-info-area">
          <span className="author"><a>{author}</a></span>
          <span className="updated">{created}</span>
        </section>
        <section className="body-area">
          <span className="toggle-btn" onClick={() => onToggleBodyClick()}>
            <a className="toggle-body-fold">{iconToggleBody}</a>
          </span>
          <MarkdownViewer className="body-contents" rawText={body} />
        </section>
        <section className="button-area">
          {/* <Link to=${}></Link> */}
          <FontAwesomeIcon icon="edit" />
          <FontAwesomeIcon icon="trash-alt" />
        </section>
        <section className="source-code-area">
          <Editor className="editor"
                  height={600}
                  isReadOnly={true}
                  reviewCounts={reviewCounts}
                  onLineClick={(curr) => onLineClick(curr)}
                  value={sourceCode}
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
          <span className="txt-review-list">리뷰 목록</span>
          <span 
            className={`line-info ${selectedCodeLine === -1 ? ' active' : ''}`}
            onClick={() => onLineClick(-1)}
          >ALL</span>
          {selectedCodeLine < 0 ?
          null :
          <span className={`line-info ${selectedCodeLine >= 0 ? ' active' : ''}`}>{reviewListHeaderMsg}</span>}
        </div>
        <ReviewList className="review-list"
          data={(_=>{
            if(selectedCodeLine > 0) {
              return reviews.filter(r => r.lineNumber === selectedCodeLine);
            } else {
              return reviews;
            }
          })()} 
        />
      </section>
    </StyledSection>
  )
};

class QuestionDetail extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    

    return (

    );
  }
}

export default QuestionDetail;