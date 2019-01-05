import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSelect = styled(Select)`
  font-size: 14px;
`;

const customStyles = {
  control: (base) => ({
    ...base,
    height: 36,
    minHeight: 36,
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
  className: PropTypes.string,
  value: PropTypes.object,
  options: PropTypes.array,
  onChange: PropTypes.func
};

export default Dropdown;