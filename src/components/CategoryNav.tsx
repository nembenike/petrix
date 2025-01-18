export default function CategoryNav() {
  return (
    <nav className="bg-white border-b px-8 py-3">
      <ul className="flex gap-6 text-sm font-medium">
        <li className="hover:text-blue-600 cursor-pointer">Itthon</li>
        <li className="hover:text-blue-600 cursor-pointer">Külföld</li>
        <li className="hover:text-blue-600 cursor-pointer">Gazdaság</li>
        <li className="hover:text-blue-600 cursor-pointer">Tech</li>
        <li className="hover:text-blue-600 cursor-pointer">Sport</li>
        <li className="hover:text-blue-600 cursor-pointer">Kultúra</li>
        <li className="hover:text-blue-600 cursor-pointer">Vélemény</li>
        <li className="hover:text-blue-600 cursor-pointer">Podcast</li>
      </ul>
    </nav>
  )
} 