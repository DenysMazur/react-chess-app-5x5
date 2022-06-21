export const FigureNames = {
  FIGURE: 'Фигура',
  KING: 'Король',
  KNIGHT: 'Конь',
  PAWN: 'Пешка',
  QUEEN: 'Ферзь',
  ROOK: 'Ладья',
  BISHOP: 'Слон',
}

export class Figure {

  constructor(color, cell) {
    this.color = color
    this.cell = cell
    this.cell.figure = this
    this.logo = null
    this.name = FigureNames.FIGURE
    this.id = Math.random()
  }

  canMove(target) {
    if(target.figure?.color === this.color)
      return false
    if(target.figure?.name === FigureNames.KING)
      return false
    return true
  }

  moveFigure(target) {}
}
