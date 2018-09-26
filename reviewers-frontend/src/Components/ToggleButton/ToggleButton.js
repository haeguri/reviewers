import React from 'react';

const toggleClassName = (e) => {
  e.target.classList.toggle("active");
}

const ToggleButton = props =>  {
  const { children, onClick, ...others } = props;
  return (
    <a 
      onClick={e => {toggleClassName(e); onClick(e);}} 
      {...others}
    >
      {children}
    </a>
  ) 
};

export default ToggleButton;