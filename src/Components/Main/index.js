import React, { useContext } from 'react'
import { GameContext } from '@Context'
import { GameBoard } from '@Components/GameBoard'

export const Main = () => {
  const { status } = useContext(GameContext)

  return (
    <div className="main">
      <div className="info">{status}</div>
      <GameBoard />
    </div>
  )
}
