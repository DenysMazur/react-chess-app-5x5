import React, {useEffect, useState} from 'react'
import CellComponent from './CellComponent'
import {FigureNames} from '../models/figures/Figure'

const BoardComponent = ({board, setBoard, currentPlayer, swapPlayer}) => {
  const [selectedCell, setSelectedCell] = useState(null)
  const [keyboardSelectedCell, setKeyboardSelectedCell] = useState(null)
  function click(cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell)
      swapPlayer()
      setSelectedCell(null)
      setKeyboardSelectedCell(null)
      updateBoard()
    }

    if (cell.figure?.color === currentPlayer?.color) {
      setSelectedCell(cell)
      setKeyboardSelectedCell(cell)
    }
    
  }
  useEffect(() => {
    board.cells.forEach(row =>
      row.forEach(cell => {
        if (cell.figure?.color === currentPlayer.color && cell.figure.name === FigureNames.KING) {
          setSelectedCell(cell)
          setKeyboardSelectedCell(cell)
        }
      })
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer])

  useEffect(() => {
    highlightCells()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell])

  useEffect(() => {
    // console.log(keyboardSelectedCell)
    if (keyboardSelectedCell) {
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyboardSelectedCell])

  function handleKeyDown (e) {
    if (e.keyCode === 37) {
      if (keyboardSelectedCell.x < 1) {
        return
      }
      const leftMoveCell = board.getCell(keyboardSelectedCell.x-1, keyboardSelectedCell.y)
      setKeyboardSelectedCell(leftMoveCell)
    }
    if (e.keyCode === 38) {
      if (keyboardSelectedCell.y < 1) {
        return
      }
      const leftMoveCell = board.getCell(keyboardSelectedCell.x, keyboardSelectedCell.y-1)
      setKeyboardSelectedCell(leftMoveCell)
    }
    if (e.keyCode === 39) {
      if (keyboardSelectedCell.x > 3) {
        return
      }
      const leftMoveCell = board.getCell(keyboardSelectedCell.x+1, keyboardSelectedCell.y)
      setKeyboardSelectedCell(leftMoveCell)
    }
    if (e.keyCode === 40) {
      if (keyboardSelectedCell.y > 3) {
        return
      }
      const leftMoveCell = board.getCell(keyboardSelectedCell.x, keyboardSelectedCell.y+1)
      setKeyboardSelectedCell(leftMoveCell)
    }
    if (e.keyCode === 13) {
      if (selectedCell && selectedCell !== keyboardSelectedCell && selectedCell.figure?.canMove(keyboardSelectedCell)) {
        selectedCell.moveFigure(keyboardSelectedCell)
        swapPlayer()
        setSelectedCell(null)
        setKeyboardSelectedCell(null)
        updateBoard()
      }
      if (keyboardSelectedCell.figure?.color === currentPlayer?.color) {
        setSelectedCell(keyboardSelectedCell)
      }
    }
  }

  function highlightCells() {
    board.highlightCells(selectedCell)
    updateBoard()
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  return (
    <div>
      <h3>Текущий игрок {currentPlayer?.color}</h3>
      <div className='board'>
        {board.cells.map((row, index) =>
          <React.Fragment key={index}>
            {row.map(cell =>
              <CellComponent
                click={click}
                cell={cell}
                key={cell.id}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                highlightKeyboardMove={selectedCell !== keyboardSelectedCell && cell.x === keyboardSelectedCell?.x && cell.y === keyboardSelectedCell?.y}
              />
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default BoardComponent
