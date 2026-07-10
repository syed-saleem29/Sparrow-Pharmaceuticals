import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/common/Header/Header'
import Footer from './components/common/Footer/Footer'
import ChatBot from './components/common/ChatBot/ChatBot'
import PageTransition from './components/common/PageTransition/PageTransition'
import ScrollToTop from './components/common/ScrollToTop'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import Surgicover from './pages/Surgicover/Surgicover'
import Contact from './pages/Contact/Contact'
import Blog from './pages/Blog/Blog'
import BlogPost from './pages/BlogPost/BlogPost'
import Order from './pages/Order/Order'
import Privacy from './pages/Privacy/Privacy'
import Terms from './pages/Terms/Terms'
import Dietitian from './pages/Dietitian/Dietitian'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/surgicover" element={<Surgicover />} />
            <Route path="/surgicover" element={<Navigate to="/products/surgicover" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/order" element={<Order />} />
            <Route path="/dietitian" element={<Dietitian />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <ChatBot />
    </BrowserRouter>
  )
}
