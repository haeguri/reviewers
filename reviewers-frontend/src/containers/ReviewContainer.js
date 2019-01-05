import React, { Component } from 'react';
import Review from '../components/ReviewList/Review';
import { withRouter } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { useReviewAPI } from '../contexts/review';

class ReviewContainer extends Component {
  constructor(props) {
    super(props);

    this.hasValidForm = true;
    this.state = {
      isEditMode: false,
      form: {
        body: props.data.body
      },
      errors: {
        body: null
      }
    };
  }

  setErrorState = (field, msg) => {
    if (msg === null) {
      this.hasValidForm = true;
    } else {
      this.hasValidForm = false;
    }

    this.setState((state) => ({
      errors: {
        ...state.errors,
        [field]: msg
      }
    }))
  }

  onSaveClick = async (e) => {
    const { 
      match: { params },
      data: { _id }, 
      lineNumber, 
      authInfo, 
      reviewActions, 
    } = this.props;

    const { form: { body } } = this.state;

    const data = {
      author: authInfo._id,
      lineNumber: lineNumber,
      body: this.state.form.body,
    };

     if (!body) {
      this.setErrorState('body', '내용이 입력되지 않았습니다.');
    } else {
      this.setErrorState('body', null);
    }

    if (!this.hasValidForm) {
      this.hasValidForm = true;
      return;
    }

    try {
      await reviewActions.updateReview(data, params.qId, _id);
      this.setState({
        form: { body: '' },
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
    const {
      errors,
      isEditMode,
      form
    } = this.state;

    const { 
      data, 
      className, 
      authInfo 
    } = this.props;

    const isOwner = authInfo._id === data.author._id;

    return (
      <Review
        errors={errors}
        isOwner={isOwner}
        className={className}
        form={form}
        isEditMode={isEditMode}
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