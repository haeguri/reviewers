import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import MarkdownEditor from '../../MarkdownEditor';
import MarkdownViewer from '../../MarkdownViewer';

const StyledArticle = styled.article`
    width: 100%;
    min-height: 100px;
    border-bottom: solid 1px #b2b5b8;

    .review-header {
      padding: 10px;
    }

    .review-header {
      display: flex;
      flex-direction: row;
      align-items: center;

      .author {
        color: #646464;
      }

      .created {
        margin-left: auto;
        font-size: 13px;
        color: #9a9b9d;
      }
    }

    .review-body {
      border: solid 1px #e2e2e2;
      background-color: #fff;
      border-radius: 5px;
    }

    .review-footer {
      padding: 10px;

      a {
        background: none;
        border: none;
        font-size: 14px;
        color: #85888a;
        text-decoration: underline;
        cursor: pointer;
        padding: 0 6px;

        &:hover {
          color: #5d5f60;
        }
      }
    }

    .md-editor {
      height: 250px;
    }
`;

const Review = (props) => {
  const { 
    errors,
    isOwner,
    className, 
    isEditMode,
    form,
    data: { 
      body, author, created
    },
    onTextChange,
    onEditClick,
    onCancelClick,
    onSaveClick,
    onRemoveClick
  } = props;

  return (
    <StyledArticle className={className}>
      <div className="review-header">
        <span className="author"><a>{author.username}</a></span>
        <span className="created">{moment(created).format('YYYY-MM-DD HH:mm')}</span>
      </div>
      {isEditMode? (
        <React.Fragment>
          <div className="review-body" >
            <MarkdownEditor 
              className="md-editor" 
              value={form.body}
              onTextChange={onTextChange}
              error={errors.error}
            />
          </div>
          <div className="review-footer">
            <a onClick={onSaveClick}>저장</a>
            <a onClick={onCancelClick}>취소</a>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="review-body">
            <MarkdownViewer rawText={body} hasScroll={false} />
          </div>
          <div className="review-footer">
            {isOwner && (
              <React.Fragment>
                <a onClick={onEditClick}>수정</a>
                <a onClick={onRemoveClick}>삭제</a>
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      )}
    </StyledArticle>
  )
}

Review.propTypes = {
  data: PropTypes.shape({
    body: PropTypes.string
  })
};

Review.defaultProps = {
  data: {
    body: ''
  }
};

export default Review;