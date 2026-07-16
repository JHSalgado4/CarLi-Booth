import { useState } from 'react'
import FrameSelector from '../components/FrameSelector.jsx'
import Camera from '../components/Camera.jsx'
import Button from '../components/Button.jsx'
import { composeStrip } from '../utils/composeStrip.js'
import { saveStrip } from '../services/api.js'
import './Booth.css'

function Booth({ couple, onDone }) {
  const [shots, setShots] = useState(3)
  const [step, setStep] = useState('select') // select | capture | composing | preview
  const [stripImage, setStripImage] = useState(null)

  async function handleFinish(images) {
    setStep('composing')
    const image = await composeStrip(images, { names: couple.names, date: couple.date })
    setStripImage(image)
    saveStrip({ image, shots })
    setStep('preview')
  }

  return (
    <section className="booth">
      {step === 'select' && (
        <div className="booth-panel">
          <p className="label">CarLi Booth</p>
          <h2>Ready when you are</h2>
          <FrameSelector value={shots} onChange={setShots} />
          <Button onClick={() => setStep('capture')}>Start capturing</Button>
        </div>
      )}

      {step === 'capture' && <Camera shots={shots} onFinish={handleFinish} />}

      {step === 'composing' && (
        <div className="booth-panel">
          <p className="script composing-text">Composing your strip…</p>
        </div>
      )}

      {step === 'preview' && stripImage && (
        <div className="booth-panel">
          <p className="label">Your keepsake</p>
          <img className="strip-preview" src={stripImage} alt="Your photo strip" />
          <div className="booth-actions">
            <a className="btn btn-plain" href={stripImage} download="carli-booth-strip.jpg">
              Download
            </a>
            <Button variant="plain" onClick={() => { setStripImage(null); setStep('select') }}>
              Take another
            </Button>
            <Button onClick={onDone}>View gallery</Button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Booth
