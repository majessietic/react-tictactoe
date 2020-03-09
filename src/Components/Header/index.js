import React from 'react'
import { GameButtons } from '@Components/GameButtons'
import { GameStatus } from '@Components/GameStatus'

export const Header = (props) => {
  return (
    <div className="header">
      <GameStatus status={props.status} />
      <table>
        <tbody>
          {props.players.map((player, i) => (
            <tr key={i}>
              <td><span className='name'>{player.name}:</span></td>
              <td><span className='score'>{player.score}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <GameButtons
        settingsHidden={props.settingsHidden}
        settingsClickHandler={props.settingsClickHandler}
        switchModeHandler={props.switchModeHandler}
        newGameClickHandler={props.newGameClickHandler}
        nameChangeHandler={props.nameChangeHandler}
        resetClickHandler={props.resetClickHandler}
      />
    </div>
  )
}
