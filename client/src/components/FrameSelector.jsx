import './FrameSelector.css'

const LAYOUTS = [
  { id: 3, label: '3 Shots', desc: 'Classic strip' },
  { id: 4, label: '4 Shots', desc: 'Extra keepsake' },
]

function FrameSelector({ value, onChange }) {
  return (
    <div className="frame-selector">
      <p className="label">Choose your strip</p>
      <div className="frame-options">
        {LAYOUTS.map((layout) => (
          <button
            key={layout.id}
            className={`frame-option ${value === layout.id ? 'active' : ''}`}
            onClick={() => onChange(layout.id)}
            type="button"
          >
            <span className="frame-preview">
              {Array.from({ length: layout.id }).map((_, i) => (
                <span key={i} className="frame-slot" />
              ))}
            </span>
            <span className="frame-option-label">{layout.label}</span>
            <span className="frame-option-desc">{layout.desc}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default FrameSelector
