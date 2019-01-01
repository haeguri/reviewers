import React from 'react';
import Button from '../Button';
import styled from 'styled-components';
import Editor from '../Editor';
import ReviewList from '../ReviewList';
import MarkdownViewer from '../MarkdownViewer';
import moment from 'moment';
import { badge, languageBadge } from '../../utils/style-utils';

const StyledSection = styled.section`
  overflow: hidden;
  padding-left: 40px;
  display: flex;
  flex-direction: row;

  .language-badge {
    margin-left: 15px;
  }

  ${badge}

  .line-info {
    cursor: pointer;
    background: #fff;
    border: solid 2px #fff;
  }

  .line-info.active {
    border: solid 2px #1162bc;
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
      border-bottom: solid 1px #e2e2e2;
      padding: 20px 10px;
      display: flex;
      align-self: center;

      .actions{
        margin-left: auto;
        color: #c2c2c2;
        font-size: 18px;
      }

      .actions button {
        margin-left: 8px;
        color: #a2a2a2;
      }
    }

    .body-area, .button-area {
      margin: 20px 0;
    }

    .body-area {
      background-color: #f9f9f9;
      position: relative;
      padding: 10px;
      border-radius: 5px;

      .body-contents {
        max-height: ${props => props.isBodyFold ? '500px' : 'none'};
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
  const {
    reviewCounts,
    reviews,
    selectedLine, 
    isBodyFold, 
    data: {
      title,
      language,
      author,
      created,
      body, 
      sourceCode
    },
    onLineClick,
    onToggleBodyClick,
    onEditClick,
    onRemoveClick,
    isOwner
  } = props;

  let allBadgeExtraClassName;
  let selectedLineBadge;
  let allLineBadge;

  if(selectedLine >= 1) {
    selectedLineBadge = (<span className='badge line-info active'>{selectedLine} Line</span>);
    allBadgeExtraClassName = ''
  } else {
    selectedLineBadge = null;
    allBadgeExtraClassName = ' active';
  }

  allLineBadge = (<span className={'badge line-info' + allBadgeExtraClassName} onClick={() => onLineClick(-1)}>ALL</span>);

  return (
    <StyledSection isBodyFold={isBodyFold}>
      <section className="left">
        <section className="title-area">
          <h1>{title}</h1>
          <span className="badge language-badge">{language.label}</span>
        </section>
        <section className="meta-info-area">
          <span className="author"><a>{author.username}</a></span>
          <span className="updated">{moment(created).format('YYYY-MM-DD HH:mm')}</span>
        </section>
        <section className="body-area">
          <span className="toggle-btn" onClick={() => onToggleBodyClick()}>
            <a className="toggle-body-fold">
              {isBodyFold ?
                <Button icon='plus-circle' />
                :
                <Button icon='minus-circle' />
              }
            </a>
          </span>
          <MarkdownViewer className="body-contents" rawText={body} />
        </section>
        <section className="button-area">
          <div className="actions">
            {isOwner && 
              (<React.Fragment>
                <Button icon="edit" onClick={onEditClick}/>
                <Button icon="trash-alt" onClick={onRemoveClick}/>
              </React.Fragment>)
            }
          </div>
        </section>
        <section className="source-code-area">
          <Editor className="editor"
                  height={600}
                  isReadOnly={true}
                  reviewCounts={reviewCounts}
                  onLineClick={(curr) => onLineClick(curr)}
                  value={sourceCode}
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
          {allLineBadge}
          {selectedLineBadge}
        </div>
        <ReviewList 
          className="review-list"
          selectedLine={selectedLine}
          data={reviews} 
        />
      </section>
    </StyledSection>
  )
};

export default QuestionDetail;