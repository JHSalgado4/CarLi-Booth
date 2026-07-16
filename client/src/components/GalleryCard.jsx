import './GalleryCard.css'

function GalleryCard({ strip, onDelete }) {
  const date = new Date(strip.createdAt)

  return (
    <div className="gallery-card">
      <img src={strip.image} alt="Wedding photobooth strip" />
      <div className="gallery-card-meta">
        <span className="label">
          {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <div className="gallery-card-actions">
          <a href={strip.image} download={`carli-booth-${strip.id}.jpg`}>Download</a>
          <button type="button" onClick={() => onDelete(strip.id)}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default GalleryCard
