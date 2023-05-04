import './app.css'
import Tables from "./assets/Tables";
import ScorePanel from "./assets/ScorePanel";
import InputFadeUp from "./assets/InputFadeUp";
import RadioPicker from "./assets/RadioPicker";
import React, { useState } from 'react';
import Modal from "./assets/Modal";
import Toast from "./assets/Toast";


function App() {
  const [startMenuVisible, setStartMenuVisible] = useState(true);
  const [firstPlayerName,setFirstName] = useState("");
  const [secondPlayerName,setSecondName] = useState("");

  const [Toasts, setToasts] = useState([]);


  const [gameMode,setGameMode] = useState("");

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

  const [gameManager, setGameManager] = useState({ //Game Manager
    player: true, //indica qual player vai jogar | player == false ("O") | player == true ("X")
    board: Array.from({ length: 9 }, () => Array(9).fill('')), //Matrix 2D array que em cada array vai ter texto de cada celula
    boardWin: Array(9).fill(-1), //Indica quem ganhou no tabuleiros 0 -> p1 | 1 -> p2
    selectedTable: 0, //indica qual tabela esta selecionada
    scoreP1: 0,
    scoreP2: 0,
    firstPlayerName : "...",
    secondPlayerName : "...",
    gameMode:"",


    cleanTables : function()
    {
       this.boardWin = Array(9).fill(-1);
       this.board = Array.from({ length: 9 }, () => Array(9).fill(''));
    },

    checkForWinnerInGame : function()
    {
      const {boardWin,player} = this;
      for (let i = 0; i < winningPatterns.length; i++) {
          const [a, b, c] = winningPatterns[i];
          if (boardWin[a] == player &&
            boardWin[b] == player &&
            boardWin[c] == player) {
            
              //Aumentar a pontução do jogo ganhou 
              player ? gameManager.scoreP2++ : gameManager.scoreP1++; 

              //Abre algum tipo de modal indicar quem ganhou e se quer continuar

              //Limpar tabuleiro
              //this.cleanTables();

            console.log("Ganhou Jogo");
            return;
          }
        }
    
    },


    checkForWinnerInSelectedTable : function(tableIndex) {
      const { board, boardWin ,player} = this;
      console.log(this);
      if(boardWin[tableIndex] !== -1){return;}
      
      const currentPlayer = player === false ? "X" : "O";

      for (let i = 0; i < winningPatterns.length; i++) {
        const [a, b, c] = winningPatterns[i];
        if (board[tableIndex][a] === currentPlayer &&
            board[tableIndex][b] === currentPlayer &&
            board[tableIndex][c] === currentPlayer) {
          boardWin[tableIndex] = currentPlayer === "X" ? 0 : 1;
          console.log("Ganhou Tabuleiro");
          return;
        }
      }
    }
  });
  
  const inputStyle = {
    backgroundColor: "#373633",
    color: "white"
  };
  
  function startGame()
  {
    setToasts([]);
    console.log(Toasts);
    
    if(firstPlayerName.trim() === ''){
      const newToast = {
        type: "warning",
        message: undefined,
        title: "Primeiro nome esta vazio"
      };
      //setToasts([...Toasts, newToast]);
      setToasts([newToast]);
      return;
    }

    if(secondPlayerName.trim() === ''){
      const newToast = {
        type: "warning",
        message: undefined,
        title: "Segundo nome esta vazio"
      };
      //setToasts([...Toasts, newToast]);
      setToasts([newToast]);
      return;
    }

    //verifica se o campo esta vazio
    if(gameMode.trim() === ''){
      const newToast = {
        type: "warning",
        message: undefined,
        title: "Escolha um modo de jogo"
      };
      //setToasts([...Toasts, newToast]);
      setToasts([newToast]);
      return;
    }
    

    
    
    setStartMenuVisible(false);
  }

  
  


  return(
    <div className="app">

      {Toasts.map((toast,index) => (
           <Toast key={index} type={toast.type}  title={toast.title} message={toast.message}   ></Toast>
      ))}

      {/*
      <Modal title="Vencedor" buttonOk buttonCancel >
        <p>Parabens!!!</p>
        <p>O Manuel ganhou a partida de Tic Tac Toe</p>
        </Modal>
      */}

      <Modal  title="Ultimate TicTacToe" onClickOk={startGame}  isVisible={startMenuVisible} buttonOk="Começar">
        <div className="start-menu">
          <p>Nome dos Jogadores</p>
          <InputFadeUp setInputText={setFirstName} style={inputStyle}  title="Nome 1º Jogador"></InputFadeUp>
          <InputFadeUp setInputText={setSecondName} style={inputStyle} title="Nome 2º Jogador"></InputFadeUp>

          <p>Modo de jogo</p>
          <RadioPicker
            name="GameMode"
            setValue={setGameMode}
            options={[
              { name: "Player Vs Computer", value: "PvC" },
              { name: "Player Vs Player", value: "PvP" },
            ]}
          />
        </div>
      </Modal>
      <div className="container">
        <ScorePanel gameManager={gameManager}/>
        <Tables gameManager={gameManager} setGameManager={setGameManager} />
      </div>
    </div>
  );

  return (
    <>
      <Toast type="warning"  title="O primeiro nome esta vazio"  ></Toast>
    </>
  );
  
}
export default App;