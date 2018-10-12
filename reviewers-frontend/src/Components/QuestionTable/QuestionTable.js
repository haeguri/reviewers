import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { ReactTableDefaults } from 'react-table';
import "react-table/react-table.css";
import { getSampleQuestionList } from '../../utils/test-utils';
import styled from 'styled-components';

  const StyledReactTable = styled(ReactTable)`
    .react-table-cell {
      text-align: center;
    }

    .react-table-header {
      outline: none;
    }
  `;

const tableColumns = [{
  Header: '제목',
  accessor: 'title' // String-based value accessors!
}, {
  Header: '언어',
  accessor: 'language',
  // Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!
  maxWidth: 150
}, {
  Header: '작성자',
  accessor: 'author',
  // Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!
  maxWidth: 150
}, {
  // id: '', // Required because our accessor is not a string
  Header: '리뷰 개수',
  accessor: 'reviewCount',
  // Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!,
  maxWidth: 100
}, {
  // id: '', // Required because our accessor is not a string
  Header: '등록일',
  accessor: 'created',
  // Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!
  maxWidth: 150
}];

const reactTableOptions = {
  columns: tableColumns,
  pageSize: 10,
  column: {
    ...ReactTableDefaults.column,
    className: 'react-table-cell',
    headerClassName: 'react-table-header',
    sortable: false,
    resizable: false,
    filterable: false
  },
  expanderDefaults: {
    ...ReactTableDefaults.expanderDefaults,
    sortable: false
  }
};

const QuestionTable = props => {
  const options = {
    ...reactTableOptions,
    data: getSampleQuestionList()
  };

  return (
    <StyledReactTable {...options}/>
  );
}

QuestionTable.propTypes = {

};

QuestionTable.defaultProps = {

};

export default QuestionTable;