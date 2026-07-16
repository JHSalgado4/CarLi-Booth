import './GalleryCard.css'

function GalleryCard({ strip, onDelete }) {
  const date = new Date(strip.createdAt)

  return (
    <div className="gallery-card">
      <img src={strip.image} alt="Wedding photobooth strip" />
      <div className="gallery-card-meta">
        <div className="gallery-card-actions">
          <a
            className="gallery-card-action-link"
            href={strip.image}
            download={`carli-booth-${strip.id}.jpg`}
            aria-label="Download"
            title="Download"
          >
            <span aria-hidden>⤓</span>
          </a>
          <button
            type="button"
            className="gallery-card-action-btn"
            onClick={() => window.open(strip.image, '_blank')}
            aria-label="Print"
            title="Print"
          >
            <span aria-hidden>⎙</span>
          </button>
          <button
            type="button"
            className="gallery-card-action-btn"
            onClick={() => onDelete(strip.id)}
            aria-label="Remove"
            title="Remove"
          >
            <span aria-hidden>✕</span>
          </button>
        </div>
      </div>

    </div>
  )
}

export default GalleryCard
