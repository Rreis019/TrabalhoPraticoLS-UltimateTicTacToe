


class Bot
{
    constructor(stepsInFuture_){
        this.stepsInFuture = stepsInFuture_;
    }


    getEmptyCell(gameManager,currentTable)
    {
        const currentBoard = gameManager.board[currentTable];
        const emptyCells = currentBoard.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
        return emptyCells;
    }

    //retorna um index de 0 a 9 da jogada que ira fazer na tabela atual
    play(gameManager,setGameManager,currentTable)
    { 
        //console.log("Ola ganda bot ",currentTable);
        const playableCells = gameManager.getPlayableCells(gameManager.board,gameManager.boardWin,currentTable);

        if(playableCells.length == 0){
            console.log("no playable cell argg")
            const updatedGameManager = {
                ...gameManager,
                gameState: STATE_TIE,
            };
            setGameManager(updatedGameManager);

            return;
        }

        const randomIndex = Math.floor(Math.random() * playableCells.length);
        const randomCell = playableCells[randomIndex];
        var newBoard = [...gameManager.board];

        newBoard[randomCell.tableIndex][randomCell.cellIndex] = "X";

        setTimeout(() => {
            const updatedGameManager = {
                ...gameManager,
                player: false,
                selectedTable: randomCell.cellIndex,
                board: newBoard
            };


            updatedGameManager.checkForWinnerInSelectedTable(currentTable == -1 ? randomCell.cellIndex : currentTable);
            updatedGameManager.checkForWinnerInGame();
            updatedGameManager.player = true;

            setGameManager(updatedGameManager);
          }, 500);
    }

}

export default Bot;