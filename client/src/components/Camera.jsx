import { useEffect, useRef, useState } from 'react'
import Countdown from './Countdown.jsx'
import './Camera.css'

function Camera({ shots, onFinish }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState([])
  const [selectedDeviceId, setSelectedDeviceId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [shotIndex, setShotIndex] = useState(0)
  const [counting, setCounting] = useState(true)
  const [flash, setFlash] = useState(false)
  const captured = useRef([])

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Your browser does not support camera access.')
      setIsLoading(false)
      return undefined
    }

    let active = true
    let stream = null

    async function start() {
      try {
        setError(null)
        setIsLoading(true)

        let constraints
        if (selectedDeviceId) {
          constraints = {
            video: {
              deviceId: { exact: selectedDeviceId },
              width: 720,
              height: 960,
            },
            audio: false,
          }
        } else {
          constraints = {
            video: { facingMode: { ideal: 'user' }, width: 720, height: 960 },
            audio: false,
          }
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
        for (let i = 0; i < allDevices.length; i += 1) {
          if (allDevices[i].kind === 'videoinput') {
            videoInputs.push(allDevices[i])
          }
        }

        if (active) {
          setDevices(videoInputs)
          if (!selectedDeviceId && videoInputs.length > 0) {
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

  function capture() {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    const size = 640
    canvas.width = size
    canvas.height = size * (4 / 3)
    const ctx = canvas.getContext('2d')
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92)
    captured.current.push(dataUrl)

    setFlash(true)
    setTimeout(() => setFlash(false), 180)

    if (shotIndex + 1 >= shots) {
      onFinish(captured.current)
    } else {
      setShotIndex((i) => i + 1)
      setCounting(true)
    }
  }

  return (
    <div className="camera-stage">
      {error ? (
        <p className="camera-error">{error}</p>
      ) : (
        <>
          <div className="camera-toolbar">
            <label className="camera-device-label" htmlFor="camera-device-select">
              Camera source
            </label>
            <select
              id="camera-device-select"
              className="camera-device-select"
              value={selectedDeviceId}
              onChange={(event) => setSelectedDeviceId(event.target.value)}
              disabled={devices.length === 0 || isLoading}
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
            <p className="camera-note">Any camera your browser exposes can appear here.</p>
          </div>

          <video ref={videoRef} autoPlay playsInline muted className="camera-video" />

          {isLoading && <div className="camera-overlay" />}
          {flash && <div className="camera-flash" />}
          {counting && !isLoading && (
            <Countdown
              key={shotIndex}
              seconds={3}
              label={`Shot ${shotIndex + 1} of ${shots}`}
              onComplete={() => {
                setCounting(false)
                capture()
              }}
            />
          )}
          <div className="camera-frame-border" />
        </>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}

export default Camera
