import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CardOne from './pages/CardOne'
import AyoubDelileche from './pages/AyoubDelileche'
function App() {
  return (
    <Router basename="/DBCard">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/axel-azizi" element={<CardOne />} />
        <Route path="/ayoub-delileche" element={<AyoubDelileche />} />
      </Routes>
    </Router>
  )
}

export default App