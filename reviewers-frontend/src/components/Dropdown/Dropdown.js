import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  font-size: 14px;
`;

const customStyles = {
  control: (base) => ({
    ...base,
    height: 30,
    minHeight: 30,
  })
}

const Dropdown = props => {
  const { 
    className,
    value,
    options,
    onChange
  } = props;

  return (
    <StyledSelect className={className}
                  styles={customStyles}
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