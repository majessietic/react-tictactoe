import React, { useContext } from 'react'
import { GameContext } from '@Context'

export const Footer = () => {
  const { isSinglePlayer, players } = useContext(GameContext)

  return (
    <footer className="footer">
      <a href='https://github.com/majessietic/react-tictactoe' target='_blank' rel='noreferrer noopener'>
        {players[0].name}
        {' : '}
        <span>{players[0].score}</span>
      </a>
      {''}
      <a href='https://creatorsnuke.github.io/' target='_blank' rel='noreferrer noopener'>
        <span>{players[1].score}</span>
        {' : '}
        {players[1].name}
      </a>
    </footer>
  )
}
