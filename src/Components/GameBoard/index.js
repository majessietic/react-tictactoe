import React, { useContext } from 'react'
import { GameContext } from '@Context'
import { GameCells } from '@Components/GameCells'

export const GameBoard = () => {
  const { gameCells, onClickHandler } = useContext(GameContext)

  return (
    <div className='board'>
      {gameCells.map((cell, i) => (
        <GameCells
          key={i}
          value={cell}
          onClickHandler={onClickHandler}
          id={i + ''}
        />
      ))}
    </div>
  )
}
