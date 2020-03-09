import React from 'react'

export const GameCells = ({ value, id, onClickHandler }) => {
  let clsName = ''

  if (value === 'X') {
    clsName = 'x-marked'
  } else if (value === 'O') {
    clsName = 'o-marked'
  }

  return (
    <button 
      className={`cells ${clsName}`}
      id={id}
      onClick={onClickHandler}
    ></button>
  )
}
