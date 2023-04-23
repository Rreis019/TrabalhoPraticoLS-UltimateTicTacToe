import Tabuleiros from "./assets/Tabuleiros";
import ScorePanel from "./assets/ScorePanel";
import Celula from "./assets/Celula";
import './app.css'
import React, { useState } from 'react';

function App() {
  const [gameManager, setGameManager] = useState({ //Game Manager
    player: true, //indica qual player vai jogar
    board: Array.from({ length: 9 }, () => Array(9).fill('')), //Matrix 2D array que em cada array vai ter texto de cada celula
    boardWin: Array(9).fill(-1), //Indica quem ganhou no tabuleiros 0 -> p1 | 1 -> p2
    selectedTable: 0, //indica qual tabela esta selecionada
    scoreP1: 0,
    scoreP2: 0,


    
    checkForWinnerInSelectedTable : function(tableIndex) {
      const { board, boardWin ,player} = this;
      console.log(this);
      if(boardWin[tableIndex] !== -1){return;}
      const winningPatterns = [    
        [0, 1, 2],//1 linha
        [3, 4, 5],//2 linha
        [6, 7, 8],//3 linha
        [0, 3, 6],//1 coluna
        [1, 4, 7],//2 coluna
        [2, 5, 8],//3 coluna
        [0, 4, 8],//1 diagonal
        [2, 4, 6] //2 diagonal
      ];
      const currentPlayer = player === false ? "X" : "O";

      for (let i = 0; i < winningPatterns.length; i++) {
        const [a, b, c] = winningPatterns[i];
        if (board[tableIndex][a] === currentPlayer &&
            board[tableIndex][b] === currentPlayer &&
            board[tableIndex][c] === currentPlayer) {
          boardWin[tableIndex] = currentPlayer === "X" ? 0 : 1;
          console.log("Ganhou");
          return;
        }
      }
    }
  });

  return(
      <div className="app">
        <div className="container">

            <ScorePanel/>
            <Tabuleiros gameManager={gameManager} setGameManager={setGameManager} />
        </div>
      </div>
  );
}

export default App;