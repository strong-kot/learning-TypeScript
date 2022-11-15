import React, { FC, useState, useEffect } from "react";
import { Board } from '../models/Board'
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";


interface BoardProps {
   board: Board;
   setBoard: (board: Board) => void
   currentPlayer: Player | null
   swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {

   const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

   function click(cell: Cell) {
      if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
         selectedCell.moveFigure(cell)
         setSelectedCell(null)
      } else {
         if (cell.figure?.color === currentPlayer.color)
            setSelectedCell(cell)
      }
   }

   useEffect(() => {
      highLightCells()
   }, [])

   function highLightCells() {
      board.highLightCells(selectedCell)
   }

   function updateBoard() {
      const newBoard = board.getCopyBoard()
      setBoard(newBoard)
   }

   return (
      <div className="board">
         {board.cells.map((row, index) =>
            <React.Fragment key={index}>
               {row.map(cell =>
                  <CellComponent
                     click={click}
                     cell={cell}
                     key={cell.id}
                     selected={cell.x === selectedCell?.x && cell.y === selectedCell.y}
                  />)}

            </React.Fragment>
         )}
      </div>
   )
}

export default BoardComponent