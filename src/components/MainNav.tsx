import { Link } from 'react-router-dom'

export default function MainNav() {
  return (
    <div className="flex justify-between items-center bg-ctp-base border-b border-ctp-surface0 px-8 py-4">
      <button className="text-ctp-text hover:text-ctp-lavender transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <Link to="/" className="font-black text-5xl text-ctp-lavender hover:text-ctp-mauve transition-colors">
        petrix
      </Link>
      <Link 
        to="/editor" 
        className="flex items-center gap-2 text-ctp-text hover:text-ctp-lavender transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <span>Szerkesztés</span>
      </Link>
    </div>
  )
} 