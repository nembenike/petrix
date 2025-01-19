import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar'
import MainNav from './components/MainNav'
import CategoryNav from './components/CategoryNav'
import Editor from './pages/Editor'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <header>
        <TopBar />
        <MainNav />
        <CategoryNav />
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  )
}
