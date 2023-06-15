import { useState, useEffect } from "react"
import Square from "./Square"

const INITIAL_GAME_STATE = [
         "","","",
         "","","",
         "","",""
      ]

const WINNING_COMBOS = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
]

const INITIAL_SCORES: Scores = {X:0, O:0}
const INITIAL_PLAYER = "X"

type Scores = {
   [key: string] : number
}

function Game() {
   const [gameState, setGameState] = useState<string[]>(INITIAL_GAME_STATE)
   const [currentPlayer, setCurrentPlayer] = useState<string>(INITIAL_PLAYER)
   const [scores, setScores] = useState(INITIAL_SCORES)

   useEffect(() => {
      checkForWinner();
   }, [gameState])

   const resetBoard = () => setGameState(INITIAL_GAME_STATE)

   const changePlayer = () => {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
   }

   const handleWin = () => {
      window.alert(`Congrats Player ${currentPlayer}! You are the winner!!`);

      const newPlayerScore = scores[currentPlayer] + 1
      const newScores = {...scores}
      newScores[currentPlayer] = newPlayerScore

      setScores(newScores);

      resetBoard();
   }
   
   const handleDraw = () => {
      window.alert(`The game ended in a draw. You're both losers!`);
      resetBoard();
   }

   const checkForWinner = () => {
      let roundWon = false

      for (let index = 0; index < WINNING_COMBOS.length; index++) {
         const winCombo = WINNING_COMBOS[index];
         
         let a = gameState[winCombo[0]];
         let b = gameState[winCombo[1]];
         let c = gameState[winCombo[2]];

         if([a,b,c].includes("")) {
            continue;
         }

         if((a === b) && (b === c))
         {
            roundWon = true;
            break;
         }
      }

      if(roundWon) {
         setTimeout(() => handleWin(), 500)
         return;
      }

      if (!gameState.includes("")) {
         setTimeout(() => handleDraw(), 500)
         return;
      }

      changePlayer();
   }

   const handleCellClick = (event: any) => {
      const cellIndex = Number(event.target.getAttribute("data-cell-index"))
      
      const currentValue = gameState[cellIndex];
      console.log(" ~ FILE: Game.tsx ~ line.16 ~ handleCellClick ~ currentValue", currentValue);

      if (currentValue) { // Do not modify cell if there is already a value stored there
         return
      }

      const newValues = [...gameState]
      newValues[cellIndex] = currentPlayer
      setGameState(newValues)
   };

   return (
      <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
         <h1 className="text-center text-7xl mb-4 font-display text-white">
            Tic Tac Toe (React Edition) - Game Page
         </h1>
         <div>
            <div className="grid grid-cols-3 gap-3 mx-auto w-96">
               {
               gameState.map(
                  (player, index) =>
                  <Square 
                     key={index} 
                     onClick={handleCellClick}
                     {...{index, player}}
                     />
               )
               }
            </div>
            <div>
               <p>Next Player: <span>{currentPlayer}</span></p>
               <p>Player X Wins: <span>{scores["X"]}</span></p>
               <p>Player O Wins: <span>{scores["O"]}</span></p>
            </div>
         </div>
      </div>
   )
}

export default Game
