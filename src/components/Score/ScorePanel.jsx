import React, { useState,useEffect } from 'react';
import './PlayerScore.css';
import PlayerScore from './PlayerScore';
import Timer from "./Timer";
function ScorePanel(props)
{
    
    return (
       <div className='score-panel'>
            <PlayerScore playerColor={"#DD5E61"} text={props.gameManager.firstPlayerName} score={props.gameManager.scoreP1} />
            <Timer borderColor={"#DD5E61"} totalSeconds={60}  setbReset={props.setResetTimer} bReset={props.resetTimer}  onTimeout={props.onTimeout} ></Timer>
            <PlayerScore playerColor={"#4A68A3"} text={props.gameManager.secondPlayerName} score={props.gameManager.scoreP2} flip/>
       </div>
    );
}

export default ScorePanel;