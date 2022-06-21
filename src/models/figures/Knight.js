import {Figure, FigureNames} from './Figure'
import Colors from '../Colors'
import blackLogo from '../../assets/black-knight.png'
import whiteLogo from '../../assets/white-knight.png'

export class Knight extends Figure {
  constructor(color, cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FigureNames.KNIGHT
  }

  canMove(target) {
    if(!super.canMove(target))
      return false
    const dx = Math.abs(this.cell.x - target.x)
    const dy = Math.abs(this.cell.y - target.y)

    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
  }
}
