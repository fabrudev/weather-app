import { useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {

  return (
    <div className="App">
      <WeatherCard />
      <p className='copy'>Created by Fabrizio Zarate ©</p>
    </div>
  )
}

export default App
