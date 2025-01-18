import { Link } from 'react-router-dom'

export default function MainNav() {
  return (
    <div className="flex justify-between items-center bg-slate-900 text-white px-8 py-4">
      <button className="hover:text-gray-300">menü</button>
      <Link to="/" className="font-black text-6xl">petrix</Link>
      <div className="flex gap-4">
        <Link to="/editor" className="hover:text-gray-300">szerkesztés</Link>
      </div>
    </div>
  )
} 