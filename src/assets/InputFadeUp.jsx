

import React from 'react';
import './InputFadeUp.css';
function InputFadeUp({ className = '', ...rest }) {
    return (
        <div className={`InputFadeUp ${className}`} {...rest}>
            <input required />
            <span>{rest.title}</span>
        </div>
    );
  };
  
export default InputFadeUp;
