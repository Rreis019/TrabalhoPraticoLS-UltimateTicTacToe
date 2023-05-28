import './Cell.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faCircle, faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';


function Celula(props){
    
    //const [selected, setSelected] = useState(false); //Indica se o tabuleiro onde esta célula está selecionado
    const [hovered, setHovered] = useState(false); //Indica se o mouse esta por cima da célula
    //const [player, setPlayer] = useState(true);  //Indica quem esta jogar p1->false | p2->true
    const { selected, gameManager, setGameManager,tableIndex, index } = props;
    
    const handleMouseEnter = () => {setHovered(true);};
    const handleMouseLeave = () => {setHovered(false);};
    const handleClick = () => {
        const { board, player } = gameManager;

        if (selected && gameManager.board[tableIndex][index] === '') {
            var emptys = gameManager.getPlayableCells();
            if(emptys.length == 0){
                setGameManager(prevState => ({...prevState,gameState: 2}));//TIE
                return;
            }

            if(gameManager.gameMode === "PvC" && player === false){
                return;
            }

            const playerSymbol = player ? "O" : "X";
            console.log(tableIndex + " " + index);
            
            var newBoard = [...board];
            newBoard[tableIndex][index] = playerSymbol;
            gameManager.checkForWinnerInSelectedTable(tableIndex);
            gameManager.checkForWinnerInGame();
            
            const updatedGameManager = {
                ...gameManager,
                player: !gameManager.player,
                selectedTable: index,
                board: newBoard
            };

            setGameManager(updatedGameManager);
            props.setResetTimer(true);
      
        }
      };

 

    
    return (
        <div 
        className={`square${props.selected && hovered && gameManager.board[tableIndex][index] === '' ? 'hover' : ''}${props.selected && !props.gameManager.player ? ' selected-p1' : ''}${props.selected && props.gameManager.player ? ' selected-p2' : ''}${props.selected &&  gameManager.board[tableIndex][index] !== '' ? ' darker' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}>
            {gameManager.board[tableIndex][index] === 'X' ? (
                <FontAwesomeIcon className='times' icon={faTimes} />
            ):gameManager.board[tableIndex][index] === 'O' ? (
                <FontAwesomeIcon className='circle' icon={faCircle} />
            ) : null}
        </div>
    );
}

export default Celula;