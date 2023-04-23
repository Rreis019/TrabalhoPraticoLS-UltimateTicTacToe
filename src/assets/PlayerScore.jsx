import './PlayerScore.css';

function PlayerScore(props) {
  const flipClass = props.flip ? 'flip-horizontal' : '';
  const writeMode = props.flip ? 'vertical-rl' : '';


  return (
    <div className={`player-score ${flipClass}`}>
      <h2 className={`player-name ${flipClass} ${writeMode}`}>{props.text}</h2>
      <div className="player-score-right ${flipClass}`">
        <h2>{props.score}</h2>
      </div>
    </div>
  );
}

export default PlayerScore;