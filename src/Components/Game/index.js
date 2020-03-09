import React, { Component } from 'react'
import { GameBoard } from '@Components/GameBoard'
import { GameControlPanel } from '@Components/GameControlPanel'

const winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const initialState = {
  gameCells: Array(9).fill(null),
  isSinglePlayer: true,
  currentSign: 'X',
  isGameOver: false,
  settingsHidden: true,
  players: [
    { name: 'Player1', score: 0 },
    { name: 'Player2', score: 0 }
  ],
  currentPlayer: 0,
  status: ''
}

export class Game extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  onClickHandler = e => {
    e.preventDefault()
    const targetCell = +e.target.id
    if (this.state.gameCells[targetCell] !== null || this.state.isGameOver ) return false
    this.changeCellValue(targetCell)
    setTimeout(() => {
      if (this.state.isGameOver) return
      this.switchSign()
      if (this.state.isSinglePlayer) this.nonPlayerTurn()
    }, 200)
  }

  newGameClickHandler = e => {
    e.preventDefault()
    this.setState(prevState => {
      const temp = Object.assign({}, initialState,
        {
          players: prevState.players,
          isSinglePlayer: prevState.isSinglePlayer
        })
      return temp
    })
  }

  resetClickHandler = e => {
    e.preventDefault()
    this.setState(prevState => {
      return Object.assign({}, initialState,
        { 
          player: [ 
            {name: 'Player1', score: 0 },
            {name: 'Player2', score: 0 }
          ]
        })
    })
  }

  settingsClickHandler = e => {
    e.preventDefault()
    this.setState(prevState => {
      return {
        settingsHidden: !prevState.settingsHidden
      }
    })
  }

  switchModeHandler = () => {
    e.preventDefault()
    this.setState(prevState => {
      return {
        isSinglePlayer: !prevState.isSinglePlayer
      }
    })
  }

  nameChangeHandler = e => {
    const currentPlayer = e.target.id === 'player1name' ? 0 : 1
    let temp = this.state.players.slice()
    temp[currentPlayer].name = e.target.value
    this.setState(prevState => {
      return temp
    })
  }

  switchSign = () => {
    this.setState(prevState => {
      return { 
        currentSign: prevState.currentSign === 'X' ? 'O' : 'X',
        currentPlayer: prevState.currentPlayer === 0 ? 1 : 0
      }
    }, () => this.changeStatus(`Next turn: ${this.state.currentSign}`))
  }

  changeStatus = message => {
    this.setState(prevState => {
      return {
        status: message
      }
    })
  }

  changeCellValue = n => {
    this.setState(prevState => {
      let newState = [ ...prevState.gameCells ]
      newState[n] = this.state.currentSign
      return { gameCells: newState }
    }, () => this.calculateWinner() )
  }

  calculateWinner = () => {
    const board = [ ...this.state.gameCells ]
    for (let i = 0; i < winCombination.length; i++) {
      if (board[winCombination[i][0]] === board[winCombination[i][1]] &&
        board[winCombination[i][0]] === board[winCombination[i][2]] &&
        board[winCombination[i][0]] !== null) {
        this.changeStatus(`${this.state.players[this.state.currentPlayer].name} is the winner`)
        const tempPlayers = [ ...this.state.players]
        tempPlayers[this.state.currentPlayer].score++
        this.setState(prevState => {
          return {
            isGameOver: true,
            player: tempPlayers
          }
        }, () => {return})
      }
    }
    if (board.every(i => i !== null)) {
      this.changeStatus('It is a draw!')
      this.setState(prevState => {
        return {
          isGameOver: true
        }
      })
    }
  }

  nonPlayerTurn = () => {
    const cell = this.analizeTurn()
    this.changeCellValue(cell)
    if (!this.state.isGameOver) this.switchSign()
  }

  analizeTurn = () => {
    const board = [ ...this.state.gameCells ]
    let targetCell = null
    const currentSign = this.state.currentSign
    const oppositeSign = currentSign === 'X' ? 'O' : 'X'
    for (let i = 0; i < winCombination.length; i++) {
      // Check win Combination
      if (board[winCombination[i][0]] === board[winCombination[i][1]] &&
        board[winCombination[i][0]] === currentSign &&
        board[winCombination[i][2]] === null) {
        targetCell = winCombination[i][2]
      }
      if (board[winCombination[i][1]] === board[winCombination[i][2]] &&
        board[winCombination[i][1]] === currentSign &&
        board[winCombination[i][0]] === null) {
        targetCell = winCombination[i][0]
      }
      if (board[winCombination[i][0]] === board[winCombination[i][2]] &&
        board[winCombination[i][0]] === currentSign &&
        board[winCombination[i][1]] === null) {
        targetCell = winCombination[i][1]
      }
      if (targetCell !== null) {
        return targetCell
      }
    }

    for (let i = 0; i < winCombination.length; i++) {
      // Block Player Moves
      if (board[winCombination[i][0]] === board[winCombination[i][1]] &&
        board[winCombination[i][0]] === oppositeSign &&
        board[winCombination[i][2]] === null) {
        targetCell = winCombination[i][2]
      }
      if (board[winCombination[i][1]] === board[winCombination[i][2]] &&
        board[winCombination[i][1]] === oppositeSign &&
        board[winCombination[i][0]] === null) {
        targetCell = winCombination[i][0]
      }
      if (board[winCombination[i][0]] === board[winCombination[i][2]] &&
        board[winCombination[i][0]] === oppositeSign &&
        board[winCombination[i][1]] === null) {
        targetCell = winCombination[i][1]
      }
      if (targetCell !== null) {
        return targetCell
      }
    }

    for (let i = 0; i < winCombination.length; i++) {
      // AI trying to win?
      if (board[winCombination[i][0]] === currentSign &&
        board[winCombination[i][1]] === null &&
        board[winCombination[i][2]] === null) {
        targetCell = winCombination[i][1]
      }
      if (board[winCombination[i][1]] === currentSign &&
        board[winCombination[i][0]] === null &&
        board[winCombination[i][2]] === null) {
        targetCell = winCombination[i][0]
      }
      if (board[winCombination[i][2]] === currentSign &&
        board[winCombination[i][0]] === null &&
        board[winCombination[i][1]] === null) {
        targetCell = winCombination[i][1]
      }
      if (targetCell !== null) {
        return targetCell
      }
    }
    if (board[4] === null) return 4
    else {
      for (let i = 0; i <board.length; i++) {
        if (board[j] === null) return i
      }
    }
  }

  render () {
    return (
      <main>
        <div className="content">
          <div className="scoreboard">
            <GameControlPanel
              players={this.state.players}
              isSinglePlayer={this.state.isSinglePlayer}
              status={this.state.status}
              settingsHidden={this.state.settingsHidden}
              nameChangeHandler={this.nameChangeHandler}
              switchModeHandler={this.switchModeHandler}
              newGameClickHandler={this.newGameClickHandler}
              settingsClickHandler={this.settingsClickHandler}
              resetClickHandler={this.resetClickHandler}
            />
          </div>
          <div className="gameboard">
            <GameBoard 
              gameCells={this.state.gameCells}
              onClickHandler={this.onClickHandler}
            />
          </div>
        </div>
      </main>
    )
  }
}
