import React from 'react'

const CellComponent = ({cell, selected, click, highlightKeyboardMove}) => {
  return (
    <div
      className={['cell', cell.color, selected ? 'selected' : '', highlightKeyboardMove ? 'selectedKeyboard' : ''].join(' ')}
      onClick={() => click(cell)}
      style={{background: cell.available && cell.figure ? 'green' : ''}}
    >
      {cell.available && !cell.figure && <div className={'available'}/>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt=''/>}
    </div>
  )
}

export default CellComponent
