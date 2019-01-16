import React, { Component } from 'react';
import Review from '../components/ReviewList/Review';
import { withRouter } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { useReviewAPI } from '../contexts/review';
import withFormValidation from '../hoc/withFormValidation';

class ReviewContainer extends Component {
  componentWillMount = () => {
    this.initialize(this.props);
  }

  initialize = (props) => {
    this.setState({
      isEditMode: false,
      form: {
        body: props.data.body
      }
    })
  }

  onSaveClick = async (e) => {
    const { 
      match: { params },
      data: { _id }, 
      lineNumber, 
      authInfo, 
      reviewActions,
      validateForm,
      isValidForm
    } = this.props;

    const { form: { body } } = this.state;

    const data = {
      author: authInfo._id,
      lineNumber: lineNumber,
      body: this.state.form.body,
    };

    validateForm([
      {
        field: 'body',
        tests: [
          [body, '내용이 입력되지 않았습니다.']
        ]
      }
    ]);

    if (!isValidForm()) {
      return;
    }

    try {
      await reviewActions.updateReview(data, params.qId, _id);
      this.setState({
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
    const { resetValidation } = this.props;
    this.setState({
      isEditMode: false
    });

    this.initialize(this.props);
    resetValidation();
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
      match: { params },
      data: { _id },
      reviewActions,
    } = this.props;

    await reviewActions.deleteReview(params.qId, _id);
  }

  render = () => {
    const {
      isEditMode,
      form
    } = this.state;

    const { 
      data, 
      className, 
      authInfo,
      errors
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

export default withRouter(useAuth(useReviewAPI(withFormValidation(ReviewContainer))));