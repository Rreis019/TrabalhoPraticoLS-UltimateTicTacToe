import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ButtonSwipe from "./ButtonSwipe";
import './Modal.css'


function Modal(props) 
{
    //title
    //msg
    //buttons
    if(props.isVisible == false){return <></>;}

    return (
        <div className='modal-fixed'>
            <div className="modal-overlay">

                <div className="modal-header">
                    <h1>{props.title}</h1>
                </div>

                <div className="modal-content">
                    {props.children}
                </div>

                <div className="modal-buttons">
                    { props.buttonCancel !== undefined ?(
                        <ButtonSwipe className="btn-cancel">Sair</ButtonSwipe>
                        ): null}
                    { props.buttonOk !== undefined ?(
                        <ButtonSwipe onClick={props.onClickOk} className='btn-continue'>{props.buttonOk}</ButtonSwipe>
                        ): null}
                    
                </div>
            </div>
        </div>
    );


}

export default Modal;