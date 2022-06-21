import {Figure, FigureNames} from './Figure'
import Colors from '../Colors'
import blackLogo from '../../assets/black-rook.png'
import whiteLogo from '../../assets/white-rook.png'

export class Rook extends Figure {
  constructor(color, cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FigureNames.ROOK
  }

  canMove(target) {
    if(!super.canMove(target))
      return false
    if(this.cell.isEmptyVertical(target))
      return true
    if(this.cell.isEmptyHorizontal(target))
      return true
    return false
  }
}
