import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const StyledSelect = styled(Select)`

`;

const Dropdown = props => {
  const { 
    className,
    value,
    ...others
  } = props;

  return (
    <StyledSelect 
      className={className}
      value={value}
      {...others}>
    </StyledSelect>
  )
}

Dropdown.propTypes = {

};

Dropdown.defaultValues = {

};

export default Dropdown;