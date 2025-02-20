import { useState } from 'react'

import './App.css'
import ControlPanel from './components/ControlPanel'
import ChartContainer from './components/ChartContainer'

function App() {

  return (
    <div className='container'>    
        <ControlPanel/>  
        <ChartContainer/>
    </div>
  )
}

export default App
