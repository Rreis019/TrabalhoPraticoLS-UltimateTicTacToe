
import './PlayerScore.css';
import PlayerScore from './PlayerScore';

function ScorePanel(props)
{
    return (
       <div className='score-panel'>
            <PlayerScore playerColor={"#DD5E61"} text={props.gameManager.firstPlayerName} score={props.gameManager.scoreP1} />
            <h1>Vs</h1>
            <PlayerScore playerColor={"#4A68A3"} text={props.gameManager.secondPlayerName} score={props.gameManager.scoreP2} flip/>
       </div>
    );
}

export default ScorePanel;