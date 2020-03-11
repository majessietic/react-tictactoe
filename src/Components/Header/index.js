import React, { useContext } from 'react'
import { GameContext } from '@Context'

export const Header = () => {
  const { newGameClickHandler, resetClickHandler } = useContext(GameContext)

  return (
    <header className="header">
      <h1>Tic Tac Toe</h1>

      <div>
        <button onClick={newGameClickHandler}>New Game</button>
        <button onClick={resetClickHandler}>Reset</button>
      </div>
    </header>
  )
}
