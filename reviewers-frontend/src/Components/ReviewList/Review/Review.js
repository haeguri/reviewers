import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MarkdownEditor from '../../MarkdownEditor';
import MarkdownViewer from '../../MarkdownViewer';

const StyledArticle = styled.article`
    width: 100%;
    min-height: 100px;
    border-bottom: solid 1px #b2b5b8;

    .review-header,
    .review-body {
      padding: 10px;
    }

    .review-header {
      display: flex;
      flex-direction: row;
      align-items: center;

      .author {
        color: #646464;
      }

      .updated {
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

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false,
      editForm: {
        body: this.props.data.body
      }
    };
  }

  onEditClick() {
    this.setState({
      isEditMode: true
    })
  }

  onCancelClick() {
    this.setState({
      isEditMode: false
    });
  }

  onTextChange(e) {
    this.setState({
      editForm: {
        body: e.target.value
      }
    });
  }

  render() {
    const { 
      className, 
      data: { 
        body, author, updated
      } 
    } = this.props;
  
    const {
      isEditMode
    } = this.state;
  
    return (
      <StyledArticle className={className}>
        <div className="review-header">
          <span className="author"><a>{author}</a></span>
          <span className="updated">{updated}</span>
        </div>
        {
          !isEditMode ?
          (<div className="review-body">
            <MarkdownViewer 
              rawText={body} 
              hasScroll={false} />
          </div>) :
          (<div className="review-body">
            <MarkdownEditor 
              className="md-editor" 
              value={this.state.editForm.body}
              onTextChange={(e) => this.onTextChange(e)}/>
            {null}
          </div>)
        }
        {
          !isEditMode ?
          (<div className="review-footer">
            <a onClick={() => this.onEditClick()}>수정</a>
            <a onClick={() => { /* TODO: confirm modal call */ }}>삭제</a>
          </div>) :
          <div className="review-footer">
            <a onClick={() => { /* TODO: save api call.. */ }}>저장</a>
            <a onClick={() => this.onCancelClick()}>취소</a>
          </div>
        }
      </StyledArticle>
    ) 
  }
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