import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  font-size: 14px;
`;

const Dropdown = props => {
  const { 
    className,
    value,
    options,
    onChange
  } = props;

  return (
    <StyledSelect className={className}
                  value={value}
                  options={options}
                  onChange={onChange} 
    />
  )
}

Dropdown.propTypes = {

};

Dropdown.defaultValues = {

};

export default Dropdown;