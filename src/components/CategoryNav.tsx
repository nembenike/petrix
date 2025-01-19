export default function CategoryNav() {
  return (
    <nav className="bg-ctp-mantle border-b border-ctp-surface0 px-8 py-3">
      <ul className="flex gap-6 text-sm font-medium">
        <li className="text-ctp-text hover:text-ctp-mauve cursor-pointer transition-colors">Itthon</li>
        <li className="text-ctp-text hover:text-ctp-blue cursor-pointer transition-colors">Külföld</li>
        <li className="text-ctp-text hover:text-ctp-green cursor-pointer transition-colors">Gazdaság</li>
        <li className="text-ctp-text hover:text-ctp-peach cursor-pointer transition-colors">Tech</li>
        <li className="text-ctp-text hover:text-ctp-yellow cursor-pointer transition-colors">Sport</li>
        <li className="text-ctp-text hover:text-ctp-pink cursor-pointer transition-colors">Kultúra</li>
        <li className="text-ctp-text hover:text-ctp-rosewater cursor-pointer transition-colors">Vélemény</li>
        <li className="text-ctp-text hover:text-ctp-teal cursor-pointer transition-colors">Podcast</li>
      </ul>
    </nav>
  )
} 