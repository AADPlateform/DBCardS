import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CardOne from './pages/CardOne'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/axel-azizi" element={<CardOne />} />
      </Routes>
    </Router>
  )
}

export default App