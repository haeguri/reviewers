import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import { ReactTableDefaults } from 'react-table';
import "react-table/react-table.css";
import styled from 'styled-components';
import Pagination from '../Pagination';
import { PAGE_SIZE } from '../../const';
import moment from 'moment';

const StyledReactTable = styled(ReactTable)`
  border: none !important;

  .rt-thead {
    border-bottom: solid 3px #c2c2c2;
    box-shadow: none !important;
  }

  .react-table-cell {
    text-align: center;
    color: #222;
  } 

  .react-table-header {
    outline: none;
    border: none !important;
    color: #828283;
  }

  .pagination-bottom {
    padding: 30px 0;
  }
`;

const tableColumns = [{
    show: false,
    accessor: '_id'
  }, {
  Header: '제목',
  accessor: 'title', // String-based value accessors!
  Cell: props => {
    const { row } = props;
    return (<Link to={`/question-detail/${row._id}`}>{row.title}</Link>)
  },
}, {
  Header: '언어',
  accessor: 'language',
  maxWidth: 150
}, {
  Header: '작성자',
  accessor: 'author.username',
  maxWidth: 150
}, {
  Header: '리뷰 개수',
  accessor: 'reviews.length',
  maxWidth: 100
}, {
  Header: '등록일',
  accessor: 'created',
  maxWidth: 150,
  Cell: props => moment(props.value).format('YYYY-MM-DD HH:mm')
}];

const reactTableOptions = {
  columns: tableColumns,
  pageSize: PAGE_SIZE,
  column: {
    ...ReactTableDefaults.column,
    className: 'react-table-cell',
    headerClassName: 'react-table-header',
    sortable: false,
    resizable: false,
    filterable: false,
  },
  expanderDefaults: {
    ...ReactTableDefaults.expanderDefaults,
    sortable: false
  },
  PaginationComponent: Pagination
};

class QuestionTable extends React.Component {

  render () {
    const { data, totalDataCount, totalPageCount, pageNo, pageSize, onPageChange } = this.props;

    const options = {
      ...reactTableOptions,
      onPageChange,
      data,
      totalDataCount,
      pageSize,
      page: pageNo,
      pages: totalPageCount,
    };

    return (
      <StyledReactTable 
        manual
        {...options}
      />
    )
  }
}

export default QuestionTable;