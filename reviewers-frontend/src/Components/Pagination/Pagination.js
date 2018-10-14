import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { range } from '../../utils/js-util';
import Button from '../Button';

/**
 * 1. 버튼 생성
 *  - << 
 *  - 숫자..
 *    - (pages, )
 *  - >>
 * 
 */

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

/**
 * 
 * 총 페이지가 10
 * currPage 1 ? 1 ~ 6  (6)
 * currPage 2 ? 1 ~ 6  (6)
 * currPage 3 ? 2 ~ 7  (6)
 * currPage 4 ? 3 ~ 8  (6)
 * currPage 5 ? 4 ~ 9  (6)
 * currPage 6 ? 5 ~ 10 (6)
 * currPage 7 ? 6 ~ 10 (5)
 *  - 5 ~ 10 : 6개 *
 *    10(to) - 6(maxSize) + 1 = 5
 *    if 5 <= 
 *  - 6 ~ 10 : 5개
 * 
 * 
 */

const MAX_PAGE_NUMBERS = 5

const getPageNumbers = (currPage, pages) => {
  let fromPage = currPage - 1;
  let toPage = currPage + MAX_PAGE_NUMBERS - 1;

  if(currPage === 1) {
    fromPage = currPage;
  }

  if(toPage > pages) {
    toPage = pages;
  }

  return [
    fromPage, toPage
  ];
};

const Pagination = props => {
  const { 
    pages, 
    page: currPage,
    onPageChange,
  } = props;

  if(currPage === 0 | pages === 0) {
    return null;
  }

  const [fromPage, toPage] = getPageNumbers(currPage, pages);

  const numberButtons = range(fromPage, toPage+1).map((v, i) => {
    const className = `${currPage === v ? 'filled primary' : ''} page-btn`;
    return (
      <Button key={v} className={className} onClick={() => onPageChange(v)}>{v}</Button>
    );  
  });

  let [ prevPhase, nextPhase ] = [currPage - MAX_PAGE_NUMBERS, currPage + MAX_PAGE_NUMBERS];
  
  if(nextPhase > pages) {
    nextPhase = pages;
  }

  if(prevPhase < 1) {
    prevPhase = 1;
  }

  return (
    <StyledDiv>
      <Button className="most-left arrow-btn" onClick={() => onPageChange(1)}><FontAwesomeIcon icon="angle-double-left"/></Button>
      <Button className="arrow-btn" onClick={() => onPageChange(prevPhase)}><FontAwesomeIcon icon="angle-left"/></Button>
      {numberButtons}
      <Button className="arrow-btn" onClick={() => onPageChange(nextPhase)}><FontAwesomeIcon icon="angle-double-right"/></Button>
      <Button className="most-right arrow-btn" onClick={() => onPageChange(pages)}><FontAwesomeIcon icon="angle-right"/></Button>
    </StyledDiv>
  );
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