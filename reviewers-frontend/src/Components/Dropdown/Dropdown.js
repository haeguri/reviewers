import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const StyledSelect = styled(Select)`

`;

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: ''
    }
  }

  handleChange = (selectedItem) => {
    this.setState({selectedItem});
  }

  render() {
    const { 
      className,
      ...others
    } = this.props;

    return (
      <StyledSelect 
        className={className}
        value={this.state.selectedItem}
        {...others}>
      </StyledSelect>
    )
  }
}

Dropdown.propTypes = {

};

Dropdown.defaultValues = {

};

export default Dropdown;