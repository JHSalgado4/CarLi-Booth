import { useEffect, useState } from 'react'
import FrameSelector from '../components/FrameSelector.jsx'
import Button from '../components/Button.jsx'
import CaptureStudio from '../components/CaptureStudio.jsx'
import { composeStrip } from '../utils/composeStrip.js'
import { saveStrip } from '../services/api.js'
import './Booth.css'

const EDITOR_DEFAULTS = {
  photoFilter: 'soft',
  frameTone: 'ivory',
  sticker: 'none',
  weddingIcon: 'none',
  floralAccent: 'corners',
  dateFormat: 'long',
  overlayText: '',
  overlayPosition: 'photos',
}

const FILTER_OPTIONS = [
  { id: 'soft', label: 'Soft glow', filter: 'contrast(1.04) saturate(0.96) brightness(1.04)' },
  { id: 'warm', label: 'Warm film', filter: 'sepia(0.18) saturate(1.08) contrast(1.02)' },
  { id: 'mono', label: 'Classic mono', filter: 'grayscale(1) contrast(1.08)' },
  { id: 'clean', label: 'Clean bright', filter: 'contrast(1.02) saturate(1.02) brightness(1.08)' },
]

const TONE_OPTIONS = [
  { id: 'ivory', label: 'Ivory', color: '#f5f3ec' },
  { id: 'blush', label: 'Blush', color: '#f4ede9' },
  { id: 'sage', label: 'Sage', color: '#eef1ea' },
  { id: 'ink', label: 'Ink wash', color: '#eef2f8' },

  // Reduced set for a cleaner UI
  { id: 'champagne', label: 'Champagne', color: '#f6efe4' },
  { id: 'mocha', label: 'Mocha', color: '#efe8df' },
  { id: 'dustyRose', label: 'Dusty rose', color: '#f5e9eb' },
  { id: 'eucalyptus', label: 'Eucalyptus', color: '#edf3ef' },

  // “Gold” option implemented as a champagne tone
  { id: 'champagne', label: 'Gold', color: '#caa46a' },
]



const STICKER_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'hearts', label: 'Hearts' },
  { id: 'sparkles', label: 'Sparkles' },
]

const ICON_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'rings', label: 'Rings' },
  { id: 'bells', label: 'Bells' },
]

const FLORAL_OPTIONS = [
  { id: 'corners', label: 'Both corners' },
  { id: 'top', label: 'Top corner' },
  { id: 'bottom', label: 'Bottom corner' },
  { id: 'none', label: 'None' },
]

const DATE_FORMAT_OPTIONS = [
  { id: 'long', label: '18th July 2026' },
  { id: 'short', label: '18 Jul 2026' },
  { id: 'numeric', label: '07.18.2026' },
]

const TEMPLATES = {
  1: { shots: 3, label: 'Template 1' },
  2: { shots: 4, label: 'Template 2' },
  3: { shots: 6, label: 'Template 3' },
  4: { shots: 1, label: 'Template 4' },
  6: { shots: 3, label: 'Template 6' },
}

function downloadImage(image, filename) {
  const link = document.createElement('a')
  link.href = image
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function printImage(image) {
  const printWindow = window.open('', '_blank')
  if (!printWindow) return false

  printWindow.document.write(`<!doctype html><html><head><title>CarLi Booth Strip</title><style>html,body{margin:0;background:#fff}img{display:block;max-width:100%;max-height:100vh;margin:auto}@media print{img{max-width:100vw;max-height:100vh}}</style></head><body><img src="${image}" alt="Photo strip"></body></html>`)
  printWindow.document.close()
  printWindow.onload = () => {
    printWindow.focus()
    printWindow.print()
  }
  return true
}

function Booth({ couple, onDone }) {
  const [template, setTemplate] = useState(1)
  const [step, setStep] = useState('select') // select | capture | edit | final
  const [capturedPhotos, setCapturedPhotos] = useState([])
  const [editorConfig, setEditorConfig] = useState(EDITOR_DEFAULTS)
  const [previewImage, setPreviewImage] = useState('')
  const [isComposing, setIsComposing] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')

  useEffect(() => {
    let active = true

    async function buildPreview() {
      if (!capturedPhotos.length) {
        setPreviewImage('')
        return
      }

      setIsComposing(true)
      const image = await composeStrip(capturedPhotos, {
        names: couple.names,
        date: couple.date,
        frameTone: editorConfig.frameTone,
        photoFilter:
          FILTER_OPTIONS.find((option) => option.id === editorConfig.photoFilter)?.filter ||
          FILTER_OPTIONS[0].filter,
        template,
        sticker: editorConfig.sticker,
        weddingIcon: editorConfig.weddingIcon,
        floralAccent: editorConfig.floralAccent,
        dateFormat: editorConfig.dateFormat,
        overlayText: editorConfig.overlayText,
        overlayPosition: editorConfig.overlayPosition,
      })

      if (active) {
        setPreviewImage(image)
        setIsComposing(false)
      }
    }

    buildPreview()

    return () => {
      active = false
    }
  }, [capturedPhotos, couple.date, couple.names, editorConfig, template])

  function handleCaptureComplete(images) {
    setCapturedPhotos(images)
    setEditorConfig(EDITOR_DEFAULTS)
    setStep('edit')
  }

  function startCapture() {
    setCapturedPhotos([])
    setPreviewImage('')
    setEditorConfig(EDITOR_DEFAULTS)
    setSaveStatus('')
    setStep('capture')
  }

  function handleDownload() {
    if (!previewImage) return
    downloadImage(previewImage, 'carli-booth-strip.jpg')
  }

  function handlePrint() {
    if (!previewImage) return
    if (!printImage(previewImage)) {
      setSaveStatus('Allow pop-ups to print your strip.')
    }
  }

  async function handleSave() {
    if (!previewImage) return
    setSaveStatus('Saving...')
    try {
      await saveStrip({ image: previewImage, shots: TEMPLATES[template].shots, meta: { ...editorConfig, template } })
      setSaveStatus('Saved to gallery.')
    } catch {
      setSaveStatus('Could not save. Your download is still available.')
    }
  }

  const filterLabel = FILTER_OPTIONS.find((option) => option.id === editorConfig.photoFilter)?.label || 'Soft glow'
  const toneLabel = TONE_OPTIONS.find((option) => option.id === editorConfig.frameTone)?.label || 'Ivory'

  return (
    <section className={`booth stage-${step}`}>
      {step === 'select' && (
        <div className="booth-shell booth-shell--select">
          <div className="booth-intro">
            <p className="label">CarLi Booth</p>
            <h2>Choose your strip template</h2>
            <p className="booth-description">
              The layout is designed to scale into a fuller editing suite later, while keeping today’s flow fast and simple.
            </p>
          </div>

          <div className="booth-panel">
            <FrameSelector value={template} onChange={setTemplate} />
            <div className="booth-template-note">
              <span>1-second capture delay</span>
              <span>Live camera preview</span>
              <span>Retake individual photos</span>
            </div>
            <Button onClick={startCapture}>Start capturing</Button>
          </div>

          <aside className="booth-sidecard">
            <p className="label">Personalize your strip</p>
            <h3>Finishing details are ready after capture</h3>
            <p>
              Add stickers, wedding icons, floral accents, a message, and your preferred date format before the final preview.
            </p>
          </aside>
        </div>
      )}

      {step === 'capture' && (
        <CaptureStudio
          shots={TEMPLATES[template].shots}
          initialPhotos={capturedPhotos.length ? capturedPhotos : undefined}
          onBack={() => {
            setCapturedPhotos([])
            setPreviewImage('')
            setStep('select')
          }}
          onComplete={handleCaptureComplete}
        />
      )}

      {step === 'edit' && (
        <div className="booth-shell booth-shell--edit">
          <div className="editor-layout">
            <section className="editor-main">
              <div className="booth-intro compact">
                <p className="label">Editing Page</p>
                <h2>Refine the strip</h2>
                <p className="booth-description">
                  Filters and strip colors update the preview in real time. The surrounding layout reserves space for future customization tools.
                </p>
              </div>

              <div className="editor-preview-card">
                {isComposing ? (
                  <p className="script composing-text">Updating preview…</p>
                ) : (
                  <img className="strip-preview" src={previewImage} alt="Live photo strip preview" />
                )}
              </div>
            </section>

            <aside className="editor-sidebar">
              <div className="editor-controls-card">
                <div className="editor-group">
                  <p className="label">Photo filters</p>
                  <div className="chip-row">
                    {FILTER_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`chip ${editorConfig.photoFilter === option.id ? 'active' : ''}`}
                        onClick={() => setEditorConfig((current) => ({ ...current, photoFilter: option.id }))}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="editor-group">
                  <p className="label">Strip color</p>
                  <div className="tone-row">
                    {TONE_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`tone-swatch ${editorConfig.frameTone === option.id ? 'active' : ''}`}
                        onClick={() => setEditorConfig((current) => ({ ...current, frameTone: option.id }))}
                        style={{ '--tone-color': option.color }}
                      >
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="editor-group future-group">
                  <p className="label">Decorations</p>
                  <div className="editor-choice-grid">
                    <div className="editor-choice">
                      <span>Stickers</span>
                      <div className="chip-row">
                        {STICKER_OPTIONS.map((option) => (
                          <button key={option.id} type="button" className={`chip ${editorConfig.sticker === option.id ? 'active' : ''}`} onClick={() => setEditorConfig((current) => ({ ...current, sticker: option.id }))}>{option.label}</button>
                        ))}
                      </div>
                    </div>
                    <div className="editor-choice">
                      <span>Wedding icon</span>
                      <div className="chip-row">
                        {ICON_OPTIONS.map((option) => (
                          <button key={option.id} type="button" className={`chip ${editorConfig.weddingIcon === option.id ? 'active' : ''}`} onClick={() => setEditorConfig((current) => ({ ...current, weddingIcon: option.id }))}>{option.label}</button>
                        ))}
                      </div>
                    </div>
                    <div className="editor-choice">
                      <span>Floral placement</span>
                      <div className="chip-row">
                        {FLORAL_OPTIONS.map((option) => (
                          <button key={option.id} type="button" className={`chip ${editorConfig.floralAccent === option.id ? 'active' : ''}`} onClick={() => setEditorConfig((current) => ({ ...current, floralAccent: option.id }))}>{option.label}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="editor-group future-group">
                  <p className="label">Text and date</p>
                  <label className="editor-field">
                    <span>Text overlay</span>
                    <input value={editorConfig.overlayText} maxLength="42" placeholder="Add a short message" onChange={(event) => setEditorConfig((current) => ({ ...current, overlayText: event.target.value }))} />
                  </label>
                  <div className="editor-choice">
                    <span>Overlay placement</span>
                    <div className="chip-row">
                      <button type="button" className={`chip ${editorConfig.overlayPosition === 'photos' ? 'active' : ''}`} onClick={() => setEditorConfig((current) => ({ ...current, overlayPosition: 'photos' }))}>On photos</button>
                      <button type="button" className={`chip ${editorConfig.overlayPosition === 'footer' ? 'active' : ''}`} onClick={() => setEditorConfig((current) => ({ ...current, overlayPosition: 'footer' }))}>In footer</button>
                    </div>
                  </div>
                  <div className="editor-choice">
                    <span>Date format</span>
                    <div className="chip-row">
                      {DATE_FORMAT_OPTIONS.map((option) => (
                        <button key={option.id} type="button" className={`chip ${editorConfig.dateFormat === option.id ? 'active' : ''}`} onClick={() => setEditorConfig((current) => ({ ...current, dateFormat: option.id }))}>{option.label}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="editor-actions">
                <Button variant="plain" onClick={() => setStep('capture')}>
                  Retake photos
                </Button>
                <Button onClick={() => setStep('final')} disabled={!previewImage || isComposing}>
                  Final preview
                </Button>
              </div>
            </aside>
          </div>
        </div>
      )}

      {step === 'final' && previewImage && (
        <div className="booth-shell booth-shell--final">
          <div className="booth-intro compact">
            <p className="label">Final Preview</p>
            <h2>Review exactly what will be saved</h2>
            <p className="booth-description">
              This screen matches the exported strip so the final download stays predictable.
            </p>
          </div>

          <div className="final-preview-layout">
            <div className="editor-preview-card final">
              <img className="strip-preview final" src={previewImage} alt="Final photo strip preview" />
            </div>

            <div className="final-sidecard">
              <div className="editor-group">
                <p className="label">Current settings</p>
                <p className="booth-description">
                  {TEMPLATES[template].label}. Filter: {filterLabel}. Strip color: {toneLabel}.
                </p>
              </div>

              <div className="editor-group">
                <p className="label">Actions</p>
                <div className="booth-actions stacked">
                  <Button variant="plain" onClick={() => setStep('edit')}>
                    Back to editing
                  </Button>
                  <Button onClick={handleDownload}>Download</Button>
                  <Button variant="plain" onClick={handleSave}>
                    Save to gallery
                  </Button>
                  {saveStatus && <p className="save-status" role="status">{saveStatus}</p>}
                  <Button variant="plain" onClick={handlePrint}>Print</Button>
                </div>
              </div>

              <div className="editor-group">
                <p className="label">Finish</p>
                <Button onClick={onDone}>View gallery</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Booth
