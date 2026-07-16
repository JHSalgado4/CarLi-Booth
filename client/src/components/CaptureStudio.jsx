import { useEffect, useRef, useState } from 'react'
import Countdown from './Countdown.jsx'
import Button from './Button.jsx'

function CaptureStudio({ shots, initialPhotos, onBack, onComplete }) {
  const hasRestoredSession = Boolean(initialPhotos?.every(Boolean))
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState([])
  const [selectedDeviceId, setSelectedDeviceId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [photos, setPhotos] = useState(() => initialPhotos || Array.from({ length: shots }, () => null))
  const [activeIndex, setActiveIndex] = useState(0)
  const [mode, setMode] = useState(hasRestoredSession ? 'review' : 'sequence')
  const [isCounting, setIsCounting] = useState(!hasRestoredSession)
  const [countdownSeed, setCountdownSeed] = useState(0)

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const unavailableTimer = window.setTimeout(() => {
        setError('Your browser does not support camera access.')
        setIsLoading(false)
      }, 0)
      return () => window.clearTimeout(unavailableTimer)
    }

    let active = true
    let stream = null

    async function start() {
      try {
        setError(null)
        setIsLoading(true)

        const constraints = selectedDeviceId
          ? {
              video: {
                deviceId: { exact: selectedDeviceId },
                width: 1280,
                height: 800,
              },
              audio: false,
            }
          : {
              video: { facingMode: { ideal: 'user' }, width: 1280, height: 720 },
              audio: false,
            }

        stream = await navigator.mediaDevices.getUserMedia(constraints)

        if (!active) {
          if (stream) {
            stream.getTracks().forEach((track) => track.stop())
          }
          return
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        const allDevices = await navigator.mediaDevices.enumerateDevices()
        const videoInputs = []
        for (let index = 0; index < allDevices.length; index += 1) {
          if (allDevices[index].kind === 'videoinput') {
            videoInputs.push(allDevices[index])
          }
        }

        if (active) {
          setDevices(videoInputs)
          if (!selectedDeviceId && videoInputs[0]?.deviceId) {
            setSelectedDeviceId(videoInputs[0].deviceId)
          }
        }
      } catch {
        if (active) {
          setError('We could not access your camera. Please allow camera permissions and refresh.')
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    start()

    return () => {
      active = false
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [selectedDeviceId])

  function captureFrame() {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    // Match the visible 16:10 camera viewport without distorting the video feed.
    const width = 960
    const height = 600
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    const sourceWidth = video.videoWidth || width
    const sourceHeight = video.videoHeight || height
    const targetRatio = width / height
    const sourceRatio = sourceWidth / sourceHeight
    const cropWidth = sourceRatio > targetRatio ? sourceHeight * targetRatio : sourceWidth
    const cropHeight = sourceRatio > targetRatio ? sourceHeight : sourceWidth / targetRatio
    const cropX = (sourceWidth - cropWidth) / 2
    const cropY = (sourceHeight - cropHeight) / 2

    context.save()
    context.translate(width, 0)
    context.scale(-1, 1)
    context.drawImage(video, cropX, cropY, cropWidth, cropHeight, 0, 0, width, height)
    context.restore()

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92)

    setPhotos((current) => {
      const next = [...current]
      next[activeIndex] = dataUrl
      return next
    })

    if (mode === 'sequence' && activeIndex < shots - 1) {
      setActiveIndex((value) => value + 1)
      setCountdownSeed((value) => value + 1)
      setIsCounting(true)
      return
    }

    setMode('review')
    setIsCounting(false)
  }

  function retakePhoto(index) {
    if (isLoading || error) return
    setActiveIndex(index)
    setMode('review')
    setIsCounting(true)
    setCountdownSeed((value) => value + 1)
  }

  function continueToEditor() {
    if (photos.some((photo) => !photo)) return
    onComplete(photos)
  }

  const allFilled = photos.every(Boolean)
  const canProceed = allFilled

  return (
    <section className="capture-stage">
      <div className="capture-stage__header">
        <div>
          <p className="label">Photo Booth Session</p>
          <h2>Capture your strip</h2>
        </div>
      </div>

      <div className="capture-layout">
        <div className="capture-main">
          <div className="capture-card capture-camera-card">
            <div className="capture-toolbar">
              <div>
                <label className="camera-device-label" htmlFor="camera-device-select">
                  Camera source
                </label>
                <p className="capture-note">
                  Phones, capture cards, and other webcams appear here when the browser exposes them.
                </p>
              </div>
              <select
                id="camera-device-select"
                className="camera-device-select"
                value={selectedDeviceId}
                onChange={(event) => setSelectedDeviceId(event.target.value)}
                disabled={devices.length === 0}
              >
                {devices.length === 0 ? (
                  <option value="">Default camera</option>
                ) : (
                  devices.map((device, index) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Camera ${index + 1}`}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="capture-video-shell">
              <video ref={videoRef} autoPlay playsInline muted className="capture-video" />
              {isLoading && <div className="camera-overlay">Preparing camera…</div>}
              {isCounting && !isLoading && (
                <Countdown
                  key={`${activeIndex}-${countdownSeed}`}
                  seconds={5}
                  label={`Shot ${Math.min(activeIndex + 1, shots)} of ${shots}`}
                  onComplete={captureFrame}
                />
              )}
            </div>

            <div className="capture-thumbnails">
              {photos.map((photo, index) => (
                <button
                  key={`thumb-${index}`}
                  type="button"
                  className={`capture-thumb ${photo ? 'filled' : 'empty'} ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => retakePhoto(index)}
                  disabled={isLoading}
                >
                  {photo ? (
                    <img src={photo} alt={`Captured photo ${index + 1}`} />
                  ) : (
                    <span>
                      <strong>{String(index + 1).padStart(2, '0')}</strong>
                      <small>Waiting</small>
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="capture-footer">
              <Button variant="plain" onClick={onBack}>
                Back to templates
              </Button>
              <div className="capture-footer__status">
                {allFilled ? 'All photos captured. Retake any thumbnail or continue.' : 'The session captures each slot in sequence.'}
              </div>
              <Button onClick={continueToEditor} disabled={!canProceed}>
                Continue to editing
              </Button>
            </div>
          </div>
        </div>

        <aside className="capture-side">
          <div className="capture-card capture-info-card">
            <p className="label">Available after capture</p>
            <h3>Personalize before you save</h3>
            <div className="future-grid">
              <div className="future-card">
                <span>Stickers</span>
                <small>Decorative overlays in the editor</small>
              </div>
              <div className="future-card">
                <span>Icons</span>
                <small>Wedding-themed graphics and emblems</small>
              </div>
              <div className="future-card">
                <span>Florals</span>
                <small>Small embellishments and corner accents</small>
              </div>
              <div className="future-card">
                <span>Text</span>
                <small>Custom captions and messages</small>
              </div>
              <div className="future-card">
                <span>Date formats</span>
                <small>Flexible display styles for the wedding date</small>
              </div>
              <div className="future-card">
                <span>Print</span>
                <small>Open the print dialog from final preview</small>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </section>
  )
}

export default CaptureStudio
