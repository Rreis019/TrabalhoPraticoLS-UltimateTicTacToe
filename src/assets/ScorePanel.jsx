
import './PlayerScore.css';
import PlayerScore from './PlayerScore';

function ScorePanel(props)
{
    return (
       <div className='score-panel'>
            <PlayerScore text="Rodrigodddddddddd" score="0"/>
            <h1>Vs</h1>
            <PlayerScore text="Rodrigo" score="0" flip/>
       </div>
    );
}

export default ScorePanel;