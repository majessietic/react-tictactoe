import React from 'react'

export const GameButtons = (props) => {
  return (
    <div className="gamebuttons">
      <div className="gamebtns">
        <button onClick={props.newGameClickHandler}>New Game</button>
        <button onClick={props.resetClickHandler}>Reset</button>
        <button>Setting</button>
      </div>
    </div>
  )
}
