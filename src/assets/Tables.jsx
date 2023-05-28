
import './Board.css';
import Board from "./Board";
import React, { useState } from 'react';
function Tabuleiros(props)
{
    const tables = [];
    for(let i = 0; i < 9; i++) {tables.push(<Board  setResetTimer={props.setResetTimer} index={i} key={i} computer={props.computer}  selected={props.gameManager.selectedTable == i || props.gameManager.selectedTable === -1} gameManager={props.gameManager} setGameManager={props.setGameManager}/>);}
    return (<div className="boards">{tables}</div>);
}

export default Tabuleiros;