import React from 'react'
import { GameContextProvider } from '@Context'
import { Header } from '@Components/Header'
import { Main } from '@Components/Main'
import { Footer} from '@Components/Footer'

export const App = () => {
  return (
    <GameContextProvider>
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
    </GameContextProvider>
  )
}
