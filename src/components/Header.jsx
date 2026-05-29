import React from 'react'
import { Link } from 'react-router-dom'
import viteLogo from '../assets/vite.svg'

const Header = () => {
  return (
    <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-[#0b0f19]/70">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
          <img src={viteLogo} className="w-7 h-7 animate-pulse" alt="Vite Logo" />
          <span className="font-heading font-bold text-lg bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            BizCard
          </span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium text-slate-400">
          <Link to="/" className="hover:text-white transition-colors duration-200">Accueil</Link>
          <Link to="/axel-azizi" className="px-4 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 hover:text-white rounded-lg border border-indigo-500/30 transition-all duration-200">
            Card Axel
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
