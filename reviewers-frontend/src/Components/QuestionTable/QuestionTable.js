import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import { ReactTableDefaults } from 'react-table';
import "react-table/react-table.css";
import { getQuestionsWithPage } from '../../utils/test-utils';
import styled from 'styled-components';
import Pagination from '../Pagination';

const PAGE_SIZE = 10;

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
    accessor: 'id'
  }, {
  Header: '제목',
  accessor: 'title', // String-based value accessors!
  Cell: props => {
    const { row } = props;
    return (<Link to={`/question-detail/${row.id}`}>{row.title}</Link>)
  },
}, {
  Header: '언어',
  accessor: 'language',
  maxWidth: 150
}, {
  Header: '작성자',
  accessor: 'author',
  maxWidth: 150
}, {
  Header: '리뷰 개수',
  accessor: 'reviewCount',
  maxWidth: 100
}, {
  Header: '등록일',
  accessor: 'created',
  maxWidth: 150
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
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      data: [],
      pages: 0
    };
  }

  componentDidMount = () => {
    const response = getQuestionsWithPage(1, reactTableOptions.pageSize);

    this.setState({
      page: 1,
      pages: response.pages,
      data: response.data
    });
  }

  onPageChange = page => {
    const response = getQuestionsWithPage(
      page,
      reactTableOptions.pageSize
    )

    this.setState({
      page,
      pages: response.pages,
      data: response.data
    });
  }

  render = () => {
    const options = {
      ...reactTableOptions,
      data: this.state.data,
      page: this.state.page,
      pages: this.state.pages,
      onPageChange: this.onPageChange
    };

    return (
      <StyledReactTable 
        manual
        {...options}
      />
    )
  }
}

QuestionTable.propTypes = {

};

QuestionTable.defaultProps = {

};

export default QuestionTable;