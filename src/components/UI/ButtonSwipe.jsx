import React from 'react';
import './ButtonSwipe.css';
function ButtonSwipe({ className = '', ...rest }) {
    return (
      <button className={`btn-swipe ${className}`} {...rest}>
        {rest.children}
      </button>
    );
  };
  
export default ButtonSwipe;
