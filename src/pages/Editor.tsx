import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { useNavigate } from 'react-router-dom'
import { createArticle } from '../services/api'
import toast from 'react-hot-toast'

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
  const navigate = useNavigate()

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
    toast.success('Cikk sikeresen letöltve!')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const promise = createArticle(article);
    
    toast.promise(promise, {
      loading: 'Cikk közzététele...',
      success: (response) => {
        navigate(`/article/${response._id}`);
        return 'Cikk sikeresen közzétéve!';
      },
      error: 'Hiba történt a közzététel során'
    });
  };

  return (
    <div className="min-h-screen bg-ctp-base text-ctp-text">
      <div className="container mx-auto px-8 py-6">
        <h1 className="text-3xl font-bold mb-8 text-ctp-lavender">Új cikk írása</h1>
        
        <div className="grid grid-cols-2 gap-12">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-ctp-subtext0">Kategória</label>
              <select
                value={article.category}
                onChange={(e) => setArticle({ ...article, category: e.target.value })}
                className="w-full p-3 rounded-lg bg-ctp-mantle border border-ctp-surface0 text-ctp-text focus:border-ctp-lavender focus:outline-none transition-colors"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-ctp-subtext0">Cím</label>
              <input
                type="text"
                value={article.title}
                onChange={(e) => setArticle({ ...article, title: e.target.value })}
                className="w-full p-3 rounded-lg bg-ctp-mantle border border-ctp-surface0 text-ctp-text focus:border-ctp-lavender focus:outline-none transition-colors"
                placeholder="Add meg a cikk címét..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-ctp-subtext0">Kép URL</label>
              <input
                type="url"
                value={article.imageUrl}
                onChange={(e) => setArticle({ ...article, imageUrl: e.target.value })}
                className="w-full p-3 rounded-lg bg-ctp-mantle border border-ctp-surface0 text-ctp-text focus:border-ctp-lavender focus:outline-none transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-ctp-subtext0">Összefoglaló</label>
              <textarea
                value={article.summary}
                onChange={(e) => setArticle({ ...article, summary: e.target.value })}
                className="w-full p-3 rounded-lg bg-ctp-mantle border border-ctp-surface0 text-ctp-text focus:border-ctp-lavender focus:outline-none transition-colors h-24 resize-none"
                placeholder="Rövid összefoglaló a cikkről..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-ctp-subtext0">Tartalom</label>
              <div data-color-mode="dark">
                <MDEditor
                  value={article.content}
                  onChange={(value) => setArticle(prev => ({ ...prev, content: value || '' }))}
                  preview="edit"
                  height={400}
                  className="!bg-ctp-mantle !border-ctp-surface0 rounded-lg overflow-hidden"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-ctp-mauve text-ctp-base rounded-lg hover:bg-ctp-lavender transition-colors"
              >
                Közzététel
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-ctp-surface0 text-ctp-text rounded-lg hover:bg-ctp-surface1 transition-colors"
              >
                Letöltés
              </button>
            </div>
          </form>

          <div className="bg-ctp-mantle p-6 rounded-lg border border-ctp-surface0">
            <h2 className="text-xl font-bold mb-6 text-ctp-lavender">Előnézet</h2>
            <div className="prose prose-invert max-w-none">
              {article.imageUrl && (
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <div className={CATEGORIES.find(cat => cat.id === article.category)?.color}>
                {CATEGORIES.find(cat => cat.id === article.category)?.label}
              </div>
              <h1 className="text-ctp-text">{article.title}</h1>
              <p className="text-ctp-subtext0">{article.summary}</p>
              <MDEditor.Markdown 
                source={article.content} 
                className="text-ctp-text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
