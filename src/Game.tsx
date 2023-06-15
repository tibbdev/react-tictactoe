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

   // Runs whenever the gameState variable changes
   useEffect(() => {
      if (gameState === INITIAL_GAME_STATE)
      {
         return;
      }
      
      checkForWinner();
   }, [gameState])

   useEffect(() => {
      const storedScores = localStorage.getItem("scores")

      if (storedScores)
      {
         setScores(JSON.parse(storedScores));
      }
   }, [])

   // reset board back to initial condition
   const resetBoard = () => setGameState(INITIAL_GAME_STATE)

   // Switch Player
   const changePlayer = () => {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
   }

   // What happens when someone wins a round
   const handleWin = () => {
      window.alert(`Congrats Player ${currentPlayer}! You are the winner!!`);

      const newPlayerScore = scores[currentPlayer] + 1
      const newScores = {...scores}
      newScores[currentPlayer] = newPlayerScore

      setScores(newScores);

      // store score locally
      localStorage.setItem("scores", JSON.stringify(newScores));

      resetBoard();
   }
   
   // What happens when a round ends in a draw
   const handleDraw = () => {
      window.alert(`The game ended in a draw. You're both losers!`);
      resetBoard();
   }

   // Check if someone has won the game
   const checkForWinner = () => {
      let roundWon = false

      // look though the winning combinations
      for (let index = 0; index < WINNING_COMBOS.length; index++) {
         const winCombo = WINNING_COMBOS[index];
         
         // getting the gameState value at the indexes that matter for this Win Combination
         let a = gameState[winCombo[0]];
         let b = gameState[winCombo[1]];
         let c = gameState[winCombo[2]];

         // If any of the squares were blank, then this is not a winning combination of squares,
         // skip to the next win combo
         if([a,b,c].includes("")) {
            continue;
         }

         // if a, b and c have been claimed by the same player, we have a winner!
         // so break out of this for loop...
         if((a === b) && (b === c))
         {
            roundWon = true;
            break;
         }
      }

      // If there was a winner, handle winning after 500ms
      if(roundWon) {
         setTimeout(() => handleWin(), 500)
         return;
      }

      // If there are no blank sqaures, then declare the round a draw
      if (!gameState.includes("")) {
         setTimeout(() => handleDraw(), 500)
         return;
      }

      // change player
      changePlayer();
   }

   const handleCellClick = (event: any) => {
      // Get the index of the cell that was clicked
      const cellIndex = Number(event.target.getAttribute("data-cell-index"))
      // Get the current value at that cell
      const currentValue = gameState[cellIndex];

      // Do not modify cell if already claimed by a player
      if (currentValue) { 
         return
      }

      // Claim the cell for the current player
      const newValues = [...gameState]
      newValues[cellIndex] = currentPlayer
      setGameState(newValues)
   };

   return (
      <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
         <h1 className="text-center text-7xl mb-4 font-display text-white">
            Tic Tac Toe (React-TS Edition)
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
            <div className="mx-auto w-96 text-2xl text-serif">
               <p className="text-white mt-5">Next Player: <span className="font-display">{currentPlayer}</span></p>
               <p className="text-white mt-5">Player X Wins: <span>{scores["X"]}</span></p>
               <p className="text-white mt-5">Player O Wins: <span>{scores["O"]}</span></p>
            </div>
         </div>
      </div>
   )
}

export default Game
