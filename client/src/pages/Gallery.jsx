import { useState } from 'react'
import GalleryCard from '../components/GalleryCard.jsx'
import { getStrips, deleteStrip } from '../services/api.js'
import './Gallery.css'

function Gallery() {
  const [strips, setStrips] = useState(() => getStrips())

  function handleDelete(id) {
    deleteStrip(id)
    setStrips(getStrips())
  }

  return (
    <section className="gallery">
      <p className="label">Keepsakes</p>
      <h2 className="script gallery-title">Our Gallery</h2>

      {strips.length === 0 ? (
        <p className="gallery-empty">No strips yet — step into the booth to create your first one.</p>
      ) : (
        <div className="gallery-grid">
          {strips.map((strip) => (
            <GalleryCard key={strip.id} strip={strip} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Gallery
