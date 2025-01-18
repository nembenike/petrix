import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar'
import MainNav from './components/MainNav'
import CategoryNav from './components/CategoryNav'
import Editor from './pages/Editor'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <TopBar />
        <MainNav />
        <CategoryNav />
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  )
}
