import React from 'react'

const Restart = ({restart}) => {
  
  const handleRestart = () => {
    restart()
  }

  return (
    <div className='restart'>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
    </div>
  )
}

export default Restart
