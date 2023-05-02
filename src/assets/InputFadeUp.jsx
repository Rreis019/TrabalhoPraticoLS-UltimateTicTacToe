

import React from 'react';
import './InputFadeUp.css';
function InputFadeUp({setInputText ,className = '', ...rest }) {

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

      
    return (
        <div className={`InputFadeUp ${className}`}>
            <input onChange={handleInputChange} required  {...rest}/>
            <span>{rest.title}</span>
        </div>
    );
  };
  
export default InputFadeUp;
