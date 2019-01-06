import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { useReviewAPI } from '../contexts/review';
import questionAPI from '../api/question';
import QuestionDetail from '../components/QuestionDetail';

class QuestionDetailContainer extends Component {
  state = {
    data: {
      title: '',
      language: '',
      author: '',
      created: '',
      body: '',
      sourceCode: '',
    },
    isBodyFold: true,
    selectedLine: -1
  }

  componentDidMount = async () => {
    const { match: { params }, reviewActions } = this.props;
    const { data } = await questionAPI.detailQuestion(params.qId);
    
    await reviewActions.getReviews(params.qId);

    this.setState({
      data
    });
  }

  onToggleBodyClick = (e) => {
    this.setState({
      isBodyFold: !this.state.isBodyFold
    });
  }

  onLineClick = (currLine) => {
    console.log(`onLineClick curr: ${currLine}`);

    this.setState({
      selectedLine: currLine
    });
  } 

  onEditClick = async (e) => {
    const { history, match: { params } } = this.props;

    history.push(`/edit-question/${params.qId}`);
  }

  onRemoveClick = async (e) => {
    const { history, match: { params } } = this.props;

    try {
      await questionAPI.deleteQuestion(params.qId);
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { data } = this.state;
    const { reviewData, authInfo } = this.props;

    const reviewsOnSelectedLine = this._getReviewOnSelectedLine(
      reviewData,
      this.state.selectedLine
    );

    const reviewCounts = this._getReviewCounts(reviewData);
    const isOwner = data.author._id === authInfo._id

    return (
      <QuestionDetail 
        {...this.state} 
        isOwner={isOwner}
        reviews={reviewsOnSelectedLine}
        reviewCounts={reviewCounts}
        onToggleBodyClick={this.onToggleBodyClick}
        onLineClick={this.onLineClick}
        onEditClick={this.onEditClick}
        onRemoveClick={this.onRemoveClick}
      />
    );
  }

  _getReviewOnSelectedLine = (reviews, selectedLine) => {
    if (selectedLine === -1) {
      return reviews;
    }

    return reviews.filter(r => r.lineNumber === selectedLine);
  }

  _getReviewCounts = (reviews) => reviews.reduce((counts, review) => {
    const lineNumber = review.lineNumber;
    counts[lineNumber] = counts[lineNumber] ? counts[lineNumber] + 1 : 1;
    return counts;
  }, {});

}

export default withRouter(useReviewAPI(useAuth(QuestionDetailContainer)));