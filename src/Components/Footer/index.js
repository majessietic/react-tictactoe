import React, { useContext } from 'react'
import { GameContext } from '@Context'

export const Footer = () => {
  const { isSinglePlayer, switchModeHandler, players } = useContext(GameContext)

  return (
    <footer className="footer">
      <a href='https://github.com/majessietic/react-tictactoe' target='_blank' rel='noreferrer noopener'>
        {players[0].name}
        {' : '}
        <span>{players[0].score}</span>
      </a>
      <div className='row'>
        <div className='radio-switch'>
          <input type='radio' name='pvp' checked={!isSinglePlayer} id='pvp' onClick={switchModeHandler} />
          <label htmlFor='pvp'>PvP</label>
          <input type='radio' name='pve' checked={isSinglePlayer} id='pve' onClick={switchModeHandler} />
          <label htmlFor='pve'>PvE</label>
        </div>
      </div>
      <a href='https://creatorsnuke.github.io/' target='_blank' rel='noreferrer noopener'>
        <span>{players[1].score}</span>
        {' : '}
        {players[1].name}
      </a>
    </footer>
  )
}
