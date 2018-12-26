import React, { Component } from 'react';
import api from '../api/question';
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

  componentDidMount = async () => {
    const { questionId } = this.props;
    const { data } = await api.detailQuestion(questionId);
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
                      onLineClick={this.onLineClick}/>
    );
  }
}

export default QuestionDetailContainer;