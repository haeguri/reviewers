import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReviewEditor from '../components/ReviewEditor/ReviewEditor';

class ReviewEditorContainer extends Component {
  constructor(props) {
    super(props);

    this.invalidFields = new Set();
    this.state = {
      form: {
        body: '',
        author: props.authInfo._id,
        lineNumber: props.lineNumber
      },
      errors: {
        body: null,
      }
    };
  }

  setErrorState = (field, msg) => {
    if (msg === null) {
      this.invalidFields.delete(field);
    } else {
      this.invalidFields.add(field);
    }

    this.setState((state) => ({
      errors: {
        ...state.errors,
        [field]: msg
      }
    }))
  }

  onSaveClick = async (e) => {
    const { form: { body } } = this.state;
    const { reviewActions, questionId, onCancelClick } = this.props;

    if (!body) {
      this.setErrorState('body', '내용이 입력되지 않았습니다.');
    } else {
      this.setErrorState('body', null);
    }

    if (this.invalidFields.size > 0) {
      this.invalidFields.clear();
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
      errors
    } = this.state;

    const { 
      monacoEditor, 
      onCancelClick, 
      setIsMousePositionInReview
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

export default ReviewEditorContainer;