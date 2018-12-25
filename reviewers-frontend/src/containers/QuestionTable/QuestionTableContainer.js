import React, { Component }from 'react';
import api from '../../api/question';
import QuestionTable from '../../components/QuestionTable';
import { PAGE_SIZE } from '../../const';

class QuestionTableContainer extends Component {
  state = {
    totalDataCount: 0,
    totalPageCount: 0,
    pageNo: 0,
    pageSize: 0,
    data: []
  }

  _getQuestionCallback = async (pageNo) => {
    const pageSize = PAGE_SIZE;
    const { 
      data,
      totalDataCount, 
      totalPageCount
    } = await api.getQuestions(pageNo, pageSize);
  
    this.setState({
      data,
      totalDataCount,
      totalPageCount,
      pageNo,
      pageSize
    })
  }

  onPageChange = this._getQuestionCallback;
  componentDidMount = this._getQuestionCallback.bind(this, 1);

  render() {
    return (
      <QuestionTable 
        onPageChange={this.onPageChange}
        {...this.state}
      />
    )
  }
}

export default QuestionTableContainer;