import React, { Component } from 'react';
import Review from '../components/ReviewList/Review';
import { withRouter } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { useReviewAPI } from '../contexts/review';

class ReviewContainer extends Component {
  state = {
    isEditMode: false,
    form: {
      body: this.props.data.body
    }
  };

  onSaveClick = async (e) => {
    const { 
      match: {
        params 
      },
      data: { 
        _id 
      }, 
      lineNumber, 
      authInfo, 
      reviewActions, 
    } = this.props;

    const data = {
      author: authInfo._id,
      lineNumber: lineNumber,
      body: this.state.form.body,
    };

    try {
      await reviewActions.updateReview(data, params.qId, _id);
      this.setState({
        form: {
          body: ''
        },
        isEditMode: false
      })
    } catch(err) {
      
    }
  }

  onEditClick = (e) => {
    this.setState({
      isEditMode: true
    })
  }

  onCancelClick = (e) => {
    this.setState({
      isEditMode: false
    });
  }

  onTextChange = (e) => {
    this.setState({
      form: {
        body: e.target.value
      }
    });
  }

  onRemoveClick = async (e) => {
    const {
      match: {
        params
      },
      reviewActions,
      data: {
        _id
      }
    } = this.props;

    await reviewActions.deleteReview(params.qId, _id);
  }

  render = () => {
    const { data, className, authInfo } = this.props;

    const isOwner = authInfo._id === data.author._id;

    return (
      <Review
        isOwner={isOwner}
        className={className}
        form={this.state.form}
        isEditMode={this.state.isEditMode}
        data={data}
        onTextChange={this.onTextChange}
        onEditClick={this.onEditClick}
        onCancelClick={this.onCancelClick}
        onSaveClick={this.onSaveClick}
        onRemoveClick={this.onRemoveClick}
      />
    )
  }
}

export default withRouter(useAuth(useReviewAPI(ReviewContainer)));