import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/common/Header/Header'
import Footer from './components/common/Footer/Footer'
import ChatBot from './components/common/ChatBot/ChatBot'
import Home from './pages/Home/Home'
import Surgicover from './pages/Surgicover/Surgicover'
import Contact from './pages/Contact/Contact'
import Blog from './pages/Blog/Blog'
import Order from './pages/Order/Order'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/surgicover" element={<Surgicover />} />
          <Route path="/surgicover" element={<Navigate to="/products/surgicover" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/order" element={<Order />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ChatBot />
    </BrowserRouter>
  )
}
