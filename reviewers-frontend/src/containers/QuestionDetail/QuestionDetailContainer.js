import React, { Component } from 'react';
import api from '../../api/question';
import QuestionDetail from '../../components/QuestionDetail';
import { getSampleCode, getSampleReviewList } from '../../utils/test-utils';
import { getSampleMarkdown } from '../../utils/test-utils.js';

class QuestionDetailContainer extends Component {
  state = {
    //real
    // id: '',
    // data: {},
    // isBodyFold: false,
    // selectedLine: -1,

    //test...
    data: {
      title: '새로운 질문...',
      language: 'JavaScript',
      author: 'Author',
      created: '2018-07-01 23:33:11',
      body: getSampleMarkdown(),
      sourceCode: getSampleCode(),
      reviews: getSampleReviewList(),
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
    // debugger;
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