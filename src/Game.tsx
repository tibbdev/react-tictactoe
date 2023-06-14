import { useState } from "react"
import Square from "./Square"

const INITIAL_GAME_STATE = ["","","",
                            "","","",
                            "","",""]
function Game() {
  const [gameState, setGameState] = useState<string[]>(INITIAL_GAME_STATE)

  const handleCellClick = (event: any) => {
    console.log("Cell Clicked!", event.target.getAttribute("data-cell-index"));
};

  return (
      <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
        <h1 className="text-center text-7xl mb-4 font-display text-white">
          Tic Tac Toe (React Edition) - Game Page
        </h1>
        <div>
          <div className="grid grid-cols-3 gap-3 mx-auto w-96">
            {
              gameState.map((player, index) =>
                <Square 
                  key={index} 
                  onClick={handleCellClick}
                    {...{index, player}}
                  />
              )
            }
          </div>
          <div>
            Score Goes Here...
          </div>
        </div>
      </div>

  )
}

export default Game
