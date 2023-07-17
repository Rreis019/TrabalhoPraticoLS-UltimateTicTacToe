import './App.css';
import React, { useState,useEffect } from 'react';

import Tables from "../../components/Board/Tables";
import Bot from "../../components/Board/Bot";

import InputFadeUp from "../../components/UI/InputFadeUp";
import RadioPicker from "../../components/UI/RadioPicker";
import Modal from "../../components/UI/Modal";
import Toast from "../../components/UI/Toast";

import ScorePanel from "../../components/Score/ScorePanel";
import '../../components/Score/Timer.css';


function App() {
  const [startMenuVisible, setStartMenuVisible] = useState(true);
  //const [winnerMenuVisible, setWinnerMenuVisible] = useState(false);
  
  const [resetTimer,setResetTimer] = useState(false);


  const [firstPlayerName,setFirstName] = useState("");
  const [secondPlayerName,setSecondName] = useState("");

  const [ToastsVisible, setToastsVisible] = useState(true);  
  const [Toasts, setToasts] = useState([]);


  const [gameMode,setGameMode] = useState("");
  const bot = new Bot(2);

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

  const STATE_NOT_PLAYING = 0;
  const STATE_PLAYING = 1;
  const STATE_TIE = 2;
  const STATE_WIN = 3;
  const STATE_TIMEOUT = 4;

  var [gameManager, setGameManager] = useState({ //Game Manager
    player: true, //indica qual player vai jogar | player == false ("O") | player == true ("X")
    board: Array.from({ length: 9 }, () => Array(9).fill('')), //Matrix 2D array que em cada array vai ter texto de cada celula
    boardWin: Array(9).fill(-1), //Indica quem ganhou no tabuleiros 0 -> p1 | 1 -> p2
    selectedTable: 4, //indica qual tabela esta selecionada
    scoreP1: 0,
    scoreP2: 0,
    winner: -1, //Indica quem ganhou 
    firstPlayerName : "...",
    secondPlayerName : "...",
    gameMode:"",
    gameState:STATE_NOT_PLAYING,
    //0 -> playing
    //1 -> tie
    //2 -> win
    //3 -> timeout

    cleanTable : function()
    {
       this.boardWin = Array(9).fill(-1);
       this.board = Array.from({ length: 9 }, () => Array(9).fill(''));
       this.selectedTable = 4;
       this.winner = -1;
       
       /*

       setGameManager(prevState => ({...prevState,
        board : newboard,
        boardWin:newboardWin,
        selectedTable: 4,
        winner: -1
      }));
      */
    },

    resetScore : function()
    {
      setGameManager(prevState => ({...prevState,
        scoreP1: 0,
        scoreP2: 0,
      }));
    },

    resetName: function()
    {
      setGameManager(prevState => ({...prevState,
        firstPlayerName: "...",
        secondPlayerName: "...",
      }));
    },

    //Will find cells that i can select
    getPlayableCells : function(boards,boardWin,tableIndex)
    {
      const emptyCells = [];
      const isTableAlreadyWon = this.boardWin[tableIndex] !== -1;
      if(isTableAlreadyWon === false)
      {
        const currentBoard = this.board[tableIndex];
        for (let i = 0; i < currentBoard.length; i++) {
          if (currentBoard[i] === "") {
            emptyCells.push({
              tableIndex: tableIndex,
              cellIndex: i
            });
          }
        }
      }
      else{
        const playableTables = [];
        for (let i = 0; i < this.boardWin.length; i++) {
          if(this.boardWin[i] === -1){playableTables.push(i);}
        }

        for (let index = 0; index < playableTables.length; index++) {
          const table = this.board[index];
          for (let o = 0; o < table.length; o++) {
            if(table[o] == "")
            {
              emptyCells.push({
                tableIndex: index,
                cellIndex: o
              });
            }
          }
        }

      }

      //console.log(emptyCells);


      return emptyCells;
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
              this.winner = player;
              if(player === true){
                this.scoreP1++;
                //setGameManager(prevState => ({...prevState,scoreP1:this.scoreP1+1}));
              }
              else{
                this.scoreP2++;
                //setGameManager(prevState => ({...prevState,scoreP2: this.scoreP2+1}));
              }
     
            //setGameManager(prevState => ({...prevState,gameState: STATE_WIN}));
            this.gameState = STATE_WIN;
            //setWinnerMenuVisible(true);
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
          //console.log("Ganhou Tabuleiro");
          return;
        }
      }
    }
  });
  
  const inputStyle = {
    backgroundColor: "#373633",
    color: "white"
  };
  
  function onTimeout(){
    if(gameManager.gameState == STATE_PLAYING){
      const newboardWin = Array(9).fill(-1);
      const newboard = Array.from({ length: 9 }, () => Array(9).fill(''));
      setGameManager(prevState => ({
        ...prevState,
        gameState: STATE_TIMEOUT,
        board : newboard,
        boardWin:newboardWin,
        scoreP1: gameManager.player ?  prevState.scoreP1 :  prevState.scoreP1 + 1,
        scoreP2: gameManager.player ? prevState.scoreP2 + 1 : prevState.scoreP2
      }));

    }
  }


  function startGame()
  {
    setToasts([]);
    setToastsVisible(true);
    
    if(firstPlayerName.trim() === ''){
      const newToast = {
        type: "warning",
        message: undefined,
        title: "Primeiro nome esta vazio",
      };
      //setToasts([...Toasts, newToast]);
      setToasts([newToast]);
      return;
    }

    if(gameMode === "PvP")
    {
      if(secondPlayerName.trim() === ''){
        const newToast = {
        type: "warning",
        message: undefined,
        title: "Segundo nome esta vazio",
      };
      //setToasts([...Toasts, newToast]);
      setToasts([newToast]);
      return;
      }
    }

    //verifica se o campo esta vazio
    if(gameMode.trim() === ''){
      const newToast = {
        type: "warning",
        message: undefined,
        title: "Escolha um modo de jogo",
      };
      //setToasts([...Toasts, newToast]);
      setToasts([newToast]);
      return;
    }
    
    setGameManager(prevState => ({
      ...prevState,
      firstPlayerName: firstPlayerName,
      secondPlayerName: gameMode === "PvP" ? secondPlayerName : "Computer",
      gameMode: gameMode,
      gameState:STATE_PLAYING
    }));
    
    setStartMenuVisible(false);
    setResetTimer(true);
  }

  function onClickWinnerMenuOK()
  {
    gameManager.cleanTable();
    setGameManager({...gameManager, gameState: STATE_PLAYING});
    setResetTimer(true);
    //setWinnerMenuVisible(false);
  }

  function backToMenu()
  {
    gameManager.resetScore();
    gameManager.cleanTable();
    gameManager.resetName();
    setFirstName("");
    setSecondName("");
    setGameMode("");
    //setStartMenuVisible(true);
    
    
    //setWinnerMenuVisible(false);
    setGameManager({...gameManager, gameState: STATE_NOT_PLAYING});
  }

  useEffect(() => {   
    //Start computer play if is PvC gamemode
    if(gameManager.gameMode === "PvC"&& gameManager.player === false && gameManager.winner == -1){
        bot.play(gameManager,setGameManager,gameManager.selectedTable); 
        setGameManager({...gameManager, player: true});
    }
  });




  return(
    <div className="app">

      {Toasts.map((toast,index) => (
           <Toast key={index} type={toast.type} isVisible={ToastsVisible} setIsVisible={setToastsVisible}   title={toast.title} message={toast.message}   ></Toast>
      ))}

      { gameManager.gameState == STATE_WIN ?
      <Modal title="Vencedor" isVisible={true} onClickCancel={backToMenu}  onClickOk={onClickWinnerMenuOK} buttonOk="Continuar" buttonCancel >
        <p>Parabens!!!</p>
        {gameManager.gameState == STATE_WIN}
        {gameManager.player === false ?
          <p >O <span  style={{ color: '#DD5E61' }}>{gameManager.firstPlayerName}</span> ganhou a partida de Tic Tac Toe</p>:
          <p>O <span  style={{ color: '#4A68A3' }}>{gameManager.secondPlayerName}</span> ganhou a partida de Tic Tac Toe</p>
        }
       
      </Modal>
      :""}
      
      {gameManager.gameState == STATE_TIMEOUT ?
          <Modal title="O tempo esgotou" isVisible={true} onClickCancel={backToMenu}  onClickOk={onClickWinnerMenuOK} buttonOk="Continuar" buttonCancel >
          {gameManager.player === false ?
            <p >O <span  style={{ color: '#DD5E61' }}>{gameManager.firstPlayerName}</span> ganhou a partida de Tic Tac Toe</p>:
            <p>O <span  style={{ color: '#4A68A3' }}>{gameManager.secondPlayerName}</span> ganhou a partida de Tic Tac Toe</p>
          }
          </Modal>
      :""}

      {gameManager.gameState == STATE_TIE ?
          <Modal title="Empatou" isVisible={true} onClickCancel={backToMenu}  onClickOk={onClickWinnerMenuOK} buttonOk="Continuar" buttonCancel >
            <p >Empatou ninguem ganhou o jogo...</p>  
          </Modal>
      :""}

      {gameManager.gameState == STATE_NOT_PLAYING ?
        <Modal  title="Ultimate TicTacToe" onClickOk={startGame}  isVisible={true} buttonOk="Começar">
          <div className="start-menu">
            <p>Nome dos Jogadores</p>
            <InputFadeUp setInputText={setFirstName} style={inputStyle}  title="Nome 1º Jogador"></InputFadeUp>
            
            {gameMode === "PvP" || gameMode === "" ? 
              <InputFadeUp setInputText={setSecondName} style={inputStyle} title="Nome 2º Jogador"></InputFadeUp>:""
            }

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
      :""}

      <div className="container">
        <ScorePanel  onTimeout={onTimeout} setResetTimer={setResetTimer} resetTimer={resetTimer}  gameManager={gameManager}/>
        <Tables setResetTimer={setResetTimer} computer={bot} gameManager={gameManager} setGameManager={setGameManager} />
      </div>
    </div>
  );

  
}
export default App;