import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReviewEditor from '../components/ReviewEditor/ReviewEditor';
import withFormValidation from '../hoc/withFormValidation';

class ReviewEditorContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        body: '',
        author: props.authInfo._id,
        lineNumber: props.lineNumber
      }
    };
  }

  onSaveClick = async (e) => {
    const { form: { body } } = this.state;
    const { 
      reviewActions, 
      questionId, 
      onCancelClick,
      validateForm,
      isValidForm
    } = this.props;

    validateForm([
      {
        field: 'body',
        tests: [body, '내용이 입력되지 않았습니다.']
      }
    ])

    if (!isValidForm()) {
      return;
    }

    try {
      await reviewActions.newReview(this.state.form, questionId);
      onCancelClick();
    } catch(err) {
      // 서버 측 에러..
    }
  }

  onTextChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        body: e.target.value
      }
    });
  }

  render = () => {
    const { 
      monacoEditor, 
      onCancelClick, 
      setIsMousePositionInReview,
      errors
    } = this.props;

    return (
      <ReviewEditor
        errors={errors}
        value={this.state.form.body}
        onTextChange={this.onTextChange}
        onSaveClick={this.onSaveClick}
        onCancelClick={onCancelClick}
        monacoEditor={monacoEditor}
        setIsMousePositionInReview={setIsMousePositionInReview}
      />
    )
  }
}

ReviewEditorContainer.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  setIsMousePositionInReview: PropTypes.func,
  reviewActions: PropTypes.object,
  questionId: PropTypes.string,
  monacoEditor: PropTypes.object,
};

export default withFormValidation(ReviewEditorContainer);