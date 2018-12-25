import React, { Component } from 'react';
import api from '../../api';
import QuestionDetail from '../../components/QuestionDetail';
import { getSampleCode, getSampleReviewList } from '../../utils/test-utils';
import { getSampleMarkdown } from '../../utils/test-utils.js';

class QuestionDetailContainer extends Component {
  state = {
    //real
    // id: '',
    // data: {},
    // isBodyFold: false,
    // selectedCodeLine: -1,

    //test...
    data: {
      author: 'Author',
      created: '2018-07-01 23:33:11',
      body: getSampleMarkdown(),
      sourceCode: getSampleCode(),
      reviews: getSampleReviewList(),
    },
    reviewCounts: (_=>{
      return this.data.reviews.reduce((counts, review) => {
        const lineNumber = review.lineNumber;
        counts[lineNumber] = counts[lineNumber] ? counts[lineNumber] + 1 : 1;
        return counts;
      }, {});
    })(),
    isBodyFold: false,
    selectedCodeLine: -1,
  }

  onToggleBodyClick = (e) => {
    this.setState({
      isBodyFold: !this.state.isBodyFold
    });
  }

  onLineClick = (currLine) => {
    console.log(`onLineClick curr: ${curr}`);
    this.setState({
      selectedCodeLine: curr
    });
  } 

  componentDidMount = () => {
    // api.detailQuestion(this.state.id)
  }

  render() {
    return (
      <QuestionDetail {...this.state} 
                      onToggleBodyClick={onToggleBodyClick}
                      onLineClick={onLineClick}/>
    );
  }
}

export default QuestionDetailContainer;