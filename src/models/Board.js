import Cell from './Cell'
import Colors from './Colors'
import {Pawn} from './figures/Pawn'
import {King} from './figures/King'
import {Knight} from './figures/Knight'
import {Rook} from './figures/Rook'

export default class Board {
  cells = []
  lostBlackFigures = []
  lostWhiteFigures = []

  initCells() {
    for (let i = 0; i < 5; i++) {
      const row = []
      for (let j = 0; j < 5; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null))
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null))
        }
      }
      this.cells.push(row)
    }
  }

  getCopyBoard() {
    const newBoard = new Board()
    newBoard.cells = this.cells
    newBoard.lostWhiteFigures = this.lostWhiteFigures
    newBoard.lostBlackFigures = this.lostBlackFigures
    return newBoard
  }

  highlightCells(selectedCell) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target)
      }
    }
  }

  getCell(x, y) {
    return this.cells[y][x]
  }

  addPawns() {
    for (let i = 0; i < 5; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1))
      new Pawn(Colors.WHITE, this.getCell(i, 3))
    }
  }

  addKings() {
    new King(Colors.BLACK, this.getCell(2, 0))
    new King(Colors.WHITE, this.getCell(2, 4))
  }

  addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0))
    new Knight(Colors.BLACK, this.getCell(3, 0))
    new Knight(Colors.WHITE, this.getCell(1, 4))
    new Knight(Colors.WHITE, this.getCell(3, 4))
  }

  addRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0))
    new Rook(Colors.BLACK, this.getCell(4, 0))
    new Rook(Colors.WHITE, this.getCell(0, 4))
    new Rook(Colors.WHITE, this.getCell(4, 4))
  }

  addFigures() {
    this.addPawns()
    this.addKnights()
    this.addKings()
    this.addRooks()
  }
}
