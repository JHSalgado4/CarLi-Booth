import './FrameSelector.css'

const LAYOUTS = [
  { id: 1, shots: 3, label: 'Template 1', desc: '2 x 6 / 3 photo', kind: 'vertical' },
  { id: 2, shots: 4, label: 'Template 2', desc: '2 x 6 / 4 photo', kind: 'vertical' },
  { id: 3, shots: 6, label: 'Template 3', desc: '4 x 6 / 6 photo', kind: 'grid' },
  { id: 4, shots: 1, label: 'Template 4', desc: '4 x 6 / portrait', kind: 'portrait' },
  { id: 6, shots: 3, label: 'Template 6', desc: '4 x 6 / triple', kind: 'landscape' },
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
              {Array.from({ length: layout.shots }).map((_, i) => (
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
