import React from 'react'
import { GameCells } from '@Components/GameCells'

export const GameBoard = ({ gameCells, onClickHandler }) => {
  return (
    <div className="board">
      {gameCells.map((cell, i) => (
        <GameCells 
          key={i}
          value={cell}
          id={i + ''}
          onClickHandler={onClickHandler}
        />
      ))}
    </div>
  )
}
