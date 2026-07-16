import { useState } from 'react'
import './App.css'
import topRightFlower from './assets/Top-RightFlower.png'
import bottomLeftFlower from './assets/Bottom-LeftFlower.png'
import Hero from './pages/Hero.jsx'
import Booth from './pages/Booth.jsx'
import Gallery from './pages/Gallery.jsx'
import About from './pages/About.jsx'

const COUPLE = { names: 'Liza and Carmelo', date: '18th July 2026' }

function App() {
  const [page, setPage] = useState('home')

  return (
    <div className="app-frame">
      <img className="floral-corner tr" src={topRightFlower} alt="" />
      <img className="floral-corner bl" src={bottomLeftFlower} alt="" />

      <header className="app-header">
        <span>LIZA AND CARMELO</span>
        <span className="monogram">L · C</span>
        <span>{COUPLE.date.toUpperCase()}</span>
      </header>

      <nav className="app-nav">
        <button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Home</button>
        <button className={page === 'booth' ? 'active' : ''} onClick={() => setPage('booth')}>Booth</button>
        <button className={page === 'gallery' ? 'active' : ''} onClick={() => setPage('gallery')}>Gallery</button>
        <button className={page === 'about' ? 'active' : ''} onClick={() => setPage('about')}>About</button>
      </nav>

      <main className="app-body">
        {page === 'home' && <Hero couple={COUPLE} onStart={() => setPage('booth')} />}
        {page === 'booth' && <Booth couple={COUPLE} onDone={() => setPage('gallery')} />}
        {page === 'gallery' && <Gallery couple={COUPLE} />}
        {page === 'about' && <About couple={COUPLE} />}
      </main>
    </div>
  )
}

export default App
