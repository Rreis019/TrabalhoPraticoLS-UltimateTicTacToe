import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Cell from './Cell';
import './Board.css';

function Tabuleiro(props){
    const celulas = [];

    //So mostra celulas se ainda nem ganhou neste tabuleiro
    if(props.gameManager.boardWin[props.index] === -1){
      for(let i = 0; i < 9; i++) {celulas.push(<Cell index={i} key={i} tableIndex={props.index} selected={props.selected} gameManager={props.gameManager} setGameManager={props.setGameManager}/>);}
    }
    else{
       if(props.gameManager.selectedTable === props.index){
          props.setGameManager(prevState => ({
            ...prevState,
            selectedTable: -1
          }));
       }
    }

    return (
      <div className="board">
            {props.gameManager.boardWin[props.index] === 0 ? (
                <div className="board-overlay p1">
                    <FontAwesomeIcon className='times' icon={faTimes} />
                </div>
            ) : props.gameManager.boardWin[props.index] === 1 ? (
                <div className="board-overlay p2">
                    <FontAwesomeIcon className='circle' icon={faCircle} />
                </div>
            ) : null}
        {celulas}
      </div>
    );
}

export default Tabuleiro;