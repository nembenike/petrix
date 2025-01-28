export default function CategoryNav() {
  return (
    <nav className="bg-ctp-mantle border-b border-ctp-surface0 px-8 py-3">
      <ul className="flex gap-6 text-sm font-medium">
        <li className="text-ctp-text hover:text-ctp-mauve cursor-pointer transition-colors">Tech</li>
        <li className="text-ctp-text hover:text-ctp-blue cursor-pointer transition-colors">Sport</li>
        <li className="text-ctp-text hover:text-ctp-green cursor-pointer transition-colors">Kultúra</li>
        <li className="text-ctp-text hover:text-ctp-peach cursor-pointer transition-colors">Társadalom</li>
      </ul>
    </nav>
  )
} 
