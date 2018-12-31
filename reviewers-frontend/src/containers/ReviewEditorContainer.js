import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReviewEditor from '../components/ReviewEditor/ReviewEditor';

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
    const { reviewActions, questionId, onCancelClick } = this.props;
  
    await reviewActions.newReview(this.state.form, questionId);
    onCancelClick();
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
      setIsMousePositionInReview
    } = this.props;

    return (
      <ReviewEditor
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