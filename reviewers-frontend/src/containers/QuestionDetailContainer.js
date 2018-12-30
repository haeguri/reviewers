import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
      reviews: [],
    },
    reviewsOnSelectedLine: [],
    reviewCounts: {},
    isBodyFold: true,
    selectedLine: -1,
  }

  onToggleBodyClick = (e) => {
    this.setState({
      isBodyFold: !this.state.isBodyFold
    });
  }

  onLineClick = (currLine) => {
    console.log(`onLineClick curr: ${currLine}`);
    
    const { data: { reviews } } = this.state;
    let reviewsOnSelectedLine;

    if (currLine > 0) {
      reviewsOnSelectedLine = reviews.filter(r => r.lineNumber === currLine);
    } else {
      reviewsOnSelectedLine = reviews;
    }

    this.setState({
      selectedLine: currLine,
      reviewsOnSelectedLine,
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

  componentDidMount = async () => {
    const { match: { params } } = this.props;
    const { data } = await questionAPI.detailQuestion(params.qId);
    const { reviews } = data;
    
    const reviewCounts = reviews.reduce((counts, review) => {
            const lineNumber = review.lineNumber;
            counts[lineNumber] = counts[lineNumber] ? counts[lineNumber] + 1 : 1;
            return counts;
          }, {});

    this.setState({
      data,
      reviewCounts,
      reviewsOnSelectedLine: reviews
    });
  }

  render() {
    return (
      <QuestionDetail {...this.state} 
                      onToggleBodyClick={this.onToggleBodyClick}
                      onLineClick={this.onLineClick}
                      onEditClick={this.onEditClick}
                      onRemoveClick={this.onRemoveClick}
      />
    );
  }
}

export default withRouter(QuestionDetailContainer);