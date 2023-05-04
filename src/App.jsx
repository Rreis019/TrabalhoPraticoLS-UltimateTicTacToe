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
  const [winnerMenuVisible, setWinnerMenuVisible] = useState(false);

  const [firstPlayerName,setFirstName] = useState("");
  const [secondPlayerName,setSecondName] = useState("");

  const [ToastsVisible, setToastsVisible] = useState(true);  
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


    cleanTable : function()
    {
       const newboardWin = Array(9).fill(-1);
       const newboard = Array.from({ length: 9 }, () => Array(9).fill(''));
       setGameManager(prevState => ({...prevState,
        board : newboard,
        boardWin:newboardWin,
        selectedTable: 4
      }));
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


    checkForWinnerInGame : function()
    {
      const {boardWin,player} = this;
      for (let i = 0; i < winningPatterns.length; i++) {
          const [a, b, c] = winningPatterns[i];
          if (boardWin[a] == player &&
            boardWin[b] == player &&
            boardWin[c] == player) {
            

              //Aumentar a pontução do jogo ganhou 
              if(player === true){
                setGameManager(prevState => ({...prevState,scoreP1:this.scoreP1+1}));
              }
              else{
                setGameManager(prevState => ({...prevState,scoreP2: this.scoreP2+1}));
              }

            setWinnerMenuVisible(true);
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
      secondPlayerName: secondPlayerName,
    }));
    
    
    setStartMenuVisible(false);
  }

  function onClickWinnerMenuOK()
  {
    gameManager.cleanTable();
    setWinnerMenuVisible(false);
  }

  function backToMenu()
  {
    gameManager.resetScore();
    gameManager.cleanTable();
    gameManager.resetName();
    setFirstName("");
    setSecondName("");
    setGameMode("");
    setStartMenuVisible(true);
    setWinnerMenuVisible(false);
  }

  return(
    <div className="app">

      {Toasts.map((toast,index) => (
           <Toast key={index} type={toast.type} isVisible={ToastsVisible} setIsVisible={setToastsVisible}   title={toast.title} message={toast.message}   ></Toast>
      ))}

      {
      <Modal title="Vencedor" isVisible={winnerMenuVisible} onClickCancel={backToMenu}  onClickOk={onClickWinnerMenuOK} buttonOk="Continuar" buttonCancel >
        <p>Parabens!!!</p>

        {gameManager.player === false ?
          <p >O <span  style={{ color: '#DD5E61' }}>{firstPlayerName}</span> ganhou a partida de Tic Tac Toe</p>:
          <p>O <span  style={{ color: '#4A68A3' }}>{secondPlayerName}</span> ganhou a partida de Tic Tac Toe</p>
        }
       
        </Modal>
      }

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