import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Commande from './pages/Commande'
import AissaouiMoncef from './pages/AissaouiMoncef'
function App() {
  return (
    <Router basename="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aissaoui-moncef" element={<AissaouiMoncef />} />
        <Route path="/commande" element={<Commande />} />
      </Routes>
    </Router>
  )
}

export default App