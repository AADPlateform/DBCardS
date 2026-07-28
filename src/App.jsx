import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CardOne from './pages/CardOne'
import AyoubDelileche from './pages/AyoubDelileche'
import HadjerDjemili from './pages/HadjerDjemili'
import Commande from './pages/Commande'
import Fadhlo from './pages/Fadhlo'
import AissaouiMoncef from './pages/AissaouiMoncef'
function App() {
  return (
    <Router basename="/DBCard">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/axel-azizi" element={<CardOne />} />
        <Route path="/hadjer-djemili" element={<HadjerDjemili />} />
        <Route path="/ayoub-delileche" element={<AyoubDelileche />} />
        <Route path="/fadhlo" element={<Fadhlo />} />
        <Route path="/aissaoui-moncef" element={<AissaouiMoncef />} />
        <Route path="/commande" element={<Commande />} />
      </Routes>
    </Router>
  )
}

export default App