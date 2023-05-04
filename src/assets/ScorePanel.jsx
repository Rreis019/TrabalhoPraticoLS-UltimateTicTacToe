
import './PlayerScore.css';
import PlayerScore from './PlayerScore';

function ScorePanel(props)
{
    return (
       <div className='score-panel'>
            <PlayerScore text={props.gameManager.firstPlayerName} score={props.gameManager.scoreP1} />
            <h1>Vs</h1>
            <PlayerScore text={props.gameManager.secondPlayerName} score={props.gameManager.scoreP2} flip/>
       </div>
    );
}

export default ScorePanel;