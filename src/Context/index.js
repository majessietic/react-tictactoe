import React, { Component, createContext } from 'react'

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
  isSinglePlayer: false,
  currentSign: 'X',
  isGameOver: false,
  totalMoves: 0,
  players: [
    { name: 'Player', score: 0 },
    { name: 'Jessie', score: 0 }
  ],
  currentPlayer: 0,
  status: 'Click to Start'
}

export const GameContext = createContext()

export class GameContextProvider extends Component {
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
      const newGame = Object.assign({}, initialState,
        {
          players: prevState.players,
          isSinglePlayer: prevState.isSinglePlayer
        })
      return newGame
    })
  }

  resetClickHandler = e => {
    e.preventDefault()
    this.setState(prevState => {
      return Object.assign({}, initialState,
        { 
          players: [ 
            {name: 'Player', score: 0 },
            {name: 'Jessie', score: 0 }
          ]
        })
    })
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return {
        isSinglePlayer: !prevState.isSinglePlayer
      }
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
        status: prevState.status = message
      }
    })
  }

  changeCellValue = async n => {
    await new Promise((resolve, reject) => {
      this.setState(prevState => {
        let newState = [...prevState.gameCells]
        newState[n] = this.state.currentSign
        return {
          gameCells: newState,
          totalMoves: prevState.totalMoves + 1
        }
      }, () => this.calculateWinner())
      resolve()
    })
    if (this.state.totalMoves === 9) {
      this.checkDraw()
    }
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
        this.setState({
          isGameOver: true
        })
      }
    }
  }

  checkDraw = () => {
    if (!this.state.isGameOver) {
      this.changeStatus('It\'s a draw!')
      this.setState(prevState => {
        isGameOver: prevState.isGameOver = true
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
        if (board[i] === null) return i
      }
    }
  }

  render () {
    return (
      <GameContext.Provider
        value={{
          gameCells: this.state.gameCells,
          players: this.state.players,
          isSinglePlayer: this.state.isSinglePlayer,
          status: this.state.status,
          switchModeHandler: this.switchModeHandler,
          newGameClickHandler: this.newGameClickHandler,
          resetClickHandler: this.resetClickHandler,
          onClickHandler: this.onClickHandler
        }}
      >
        {this.props.children}
      </GameContext.Provider>
    )
  }
}
