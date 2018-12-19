import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { range } from '../../utils/js-util';
import Button from '../Button';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;

  .page-btn {
    border-radius: 0 !important;
    padding-left: 0;
    padding-right: 0;
    min-width: 42px;
  }

  .arrow-btn {
    border-radius: 0;
    width: 30px;
    padding: 0;
  }

  .most-left.arrow-btn {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
  }

  .most-right.arrow-btn {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  }
`;

const getPageGroup = page => Math.ceil(page / MAX_PAGE_BTN_CNT)

const MAX_PAGE_BTN_CNT = 7;
class Pagination extends React.Component {
  onNextGroupClick() {
    const lastPageGroup = getPageGroup(this.props.pages);
    let pageGroup = getPageGroup(this.props.page) + 1;

    if(pageGroup > lastPageGroup) {
      pageGroup = lastPageGroup;
    }

    const startPageNum = (pageGroup - 1) * MAX_PAGE_BTN_CNT + 1

    this.onPageClick(startPageNum);
  }

  onPrevGroupClick() {
    let pageGroup = getPageGroup(this.props.page) - 1;

    if(pageGroup < 1) {
      pageGroup = 1;
    }

    const startPageNum = (pageGroup - 1) * MAX_PAGE_BTN_CNT + 1

    this.onPageClick(startPageNum);
  }

  onPageClick(page) {
    if(page > this.props.pages) {
      page = this.props.pages;
    }

    if(page < 1) {
      page = 1;
    }

    this.props.onPageChange(page);
  }
  
  render() {
    const { page, pages, totalDataCount } = this.props;

    if(pages <= 0 || totalDataCount <= 0) {
      return null;
    }

    let pageGroupNum = Math.ceil(page/MAX_PAGE_BTN_CNT);
    let currFromPageNum = (pageGroupNum-1) * MAX_PAGE_BTN_CNT + 1;
    let currToPageNum = currFromPageNum + MAX_PAGE_BTN_CNT - 1;
  
    if(currToPageNum > pages) {
      currToPageNum = pages;
    }

    const numberButtons = range(currFromPageNum, currToPageNum + 1).map((v, i) => {
      const className = `${page === v ? 'filled primary' : ''} page-btn`;
      return (
        <Button key={v} className={className} onClick={() => this.onPageClick(v)}>{v}</Button>
      );  
    });

    return (
      <StyledDiv>
        <Button className="most-left arrow-btn" onClick={() => this.onPageClick(1)}><FontAwesomeIcon icon="angle-double-left"/></Button>
        <Button className="arrow-btn" onClick={() => this.onPrevGroupClick()}><FontAwesomeIcon icon="angle-left"/></Button>
        {numberButtons}
        <Button className="arrow-btn" onClick={() => this.onNextGroupClick()}><FontAwesomeIcon icon="angle-right"/></Button>
        <Button className="most-right arrow-btn" onClick={() => this.onPageClick(pages)}><FontAwesomeIcon icon="angle-double-right"/></Button>
      </StyledDiv>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number, // 현재 페이지
  pages: PropTypes.number, // 토탈 페이지 카운트 
  pageSize: PropTypes.number, // 하나 페이지에서 데이터 개수
  totalDataCount: PropTypes.number, // 총 데이터 개수
  onPageChange: PropTypes.func, //  페이지 변경되면?
  onPageSizeChange: PropTypes.func // 토탈 페이지 카운트 변경되면?
}

Pagination.defaultProps = {

};

export default Pagination;