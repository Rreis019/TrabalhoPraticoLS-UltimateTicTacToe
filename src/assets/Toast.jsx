
import './Toast.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faInfo, faTimes,faCheck } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
function Toast(props)
{
    const { type, title, message } = props;

    let icon = null;

    if (type === "warning") {
      icon = <FontAwesomeIcon  style={{ fontSize: "18px" }} className="logo" icon={faExclamationTriangle} />;
    } else if (type === "info") {
      icon = <FontAwesomeIcon style={{ fontSize: "14px" }} className="logo" icon={faInfo} />;
    } else if (type === "success") {
      icon = <FontAwesomeIcon className="logo" icon={faCheck} />;
    }
  
    if(props.isVisible === false){return <></>;}

    function onClickclose(){ props.setIsVisible(false)}

    return (
        <div className={`toast-1 toast-1-${type}`}>
        <div className="toast-1-left">
            <div className="border-left"></div>
            <div className="toast-1-icon">
                {icon}
            </div>
            
            <div className='toast-1-content'>
            <h6>{title}</h6>
            <p>{message}</p>
            </div>
        </div>
        <div className="toast-1-right">
            <FontAwesomeIcon onClick={onClickclose} className='close' icon={faTimes} />
        </div>
        </div>
    );
};


export default Toast;