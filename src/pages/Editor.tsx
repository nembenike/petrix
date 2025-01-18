import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'

interface ArticleForm {
  title: string
  category: string
  summary: string
  content: string
  imageUrl: string
}

const CATEGORIES = [
  { id: 'kiemelt', label: 'Kiemelt', color: 'text-red-600' },
  { id: 'itthon', label: 'Itthon', color: 'text-purple-600' },
  { id: 'kulfold', label: 'Külföld', color: 'text-blue-600' },
  { id: 'gazdasag', label: 'Gazdaság', color: 'text-green-600' },
  { id: 'tech', label: 'Tech', color: 'text-orange-600' },
]

export default function Editor() {
  const [article, setArticle] = useState<ArticleForm>({
    title: '',
    category: CATEGORIES[0].id,
    summary: '',
    content: '',
    imageUrl: '',
  })

  const generateMarkdown = () => {
    return `---
title: ${article.title}
category: ${article.category}
summary: ${article.summary}
image: ${article.imageUrl}
date: ${new Date().toISOString()}
---

# ${article.title}

${article.content}
`
  }

  const handleDownload = () => {
    const markdown = generateMarkdown()
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${article.title.toLowerCase().replace(/\s+/g, '-')}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto px-8 py-6" data-color-mode="light">
      <h1 className="text-3xl font-bold mb-6">Új cikk írása</h1>
      
      <div className="grid grid-cols-2 gap-8">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Kategória</label>
            <select
              value={article.category}
              onChange={(e) => setArticle({ ...article, category: e.target.value })}
              className="w-full p-2 border rounded"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cím</label>
            <input
              type="text"
              value={article.title}
              onChange={(e) => setArticle({ ...article, title: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Add meg a cikk címét..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kép URL</label>
            <input
              type="url"
              value={article.imageUrl}
              onChange={(e) => setArticle({ ...article, imageUrl: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Összefoglaló</label>
            <textarea
              value={article.summary}
              onChange={(e) => setArticle({ ...article, summary: e.target.value })}
              className="w-full p-2 border rounded h-20"
              placeholder="Rövid összefoglaló a cikkről..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tartalom</label>
            <MDEditor
              value={article.content}
              onChange={(value) => setArticle(prev => ({ ...prev, content: value || '' }))}
              preview="edit"
              height={400}
            />
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Markdown letöltése
          </button>
        </form>

        <div>
          <h2 className="text-xl font-bold mb-4">Előnézet</h2>
          <div className="prose max-w-none">
            {article.imageUrl && (
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}
            <div className={CATEGORIES.find(cat => cat.id === article.category)?.color}>
              {CATEGORIES.find(cat => cat.id === article.category)?.label}
            </div>
            <h1>{article.title}</h1>
            <p className="text-gray-600">{article.summary}</p>
            <MDEditor.Markdown source={article.content} />
          </div>
        </div>
      </div>
    </div>
  )
}
