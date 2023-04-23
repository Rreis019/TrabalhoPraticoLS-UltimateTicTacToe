import './Celula.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faCircle, faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';


function Celula(props){
    const [text, setText] = useState(''); //Tem a letra "X" ou "O"
    //const [selected, setSelected] = useState(false); //Indica se o tabuleiro onde esta célula está selecionado
    const [hovered, setHovered] = useState(false); //Indica se o mouse esta por cima da célula
    //const [player, setPlayer] = useState(true);  //Indica quem esta jogar p1->false | p2->true
    
    const handleMouseEnter = () => {setHovered(true);};
    const handleMouseLeave = () => {setHovered(false);};
    const handleClick = () => {
        const { selected, gameManager, setGameManager,tableIndex, index } = props;
        if (selected && text === '') {
          const { board, player } = gameManager;

          const playerSymbol = player ? "O" : "X";
          setText(playerSymbol);
          
          console.log(tableIndex + " " + index);
            
            var newBoard = [...board];
            newBoard[tableIndex][index] = playerSymbol;
            gameManager.checkForWinnerInSelectedTable(tableIndex);

            
            
            
            setGameManager(prevState => ({
                ...prevState,
                player: !player,
                selectedTable: index,
                board: newBoard
            }));
        }
      };

    return (
        <div 
        className={`square${props.selected && hovered && text === '' ? 'hover' : ''}${props.selected && !props.gameManager.player ? ' selected-p1' : ''}${props.selected && props.gameManager.player ? ' selected-p2' : ''}${props.selected && text !== '' ? ' darker' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}>
            {text === 'X' ? (
                <FontAwesomeIcon className='times' icon={faTimes} />
            ):text === 'O' ? (
                <FontAwesomeIcon className='circle' icon={faCircle} />
            ) : null}
        </div>
    );
}

export default Celula;