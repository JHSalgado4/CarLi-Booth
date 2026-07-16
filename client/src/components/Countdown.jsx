import { useEffect, useState } from 'react'
import './Countdown.css'

function Countdown({ seconds = 3, onComplete, label }) {
  const [count, setCount] = useState(seconds)

  useEffect(() => {
    if (count <= 0) {
      onComplete?.()
      return
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [count, onComplete])

  return (
    <div className="countdown-overlay">
      {label && <p className="label countdown-tag">{label}</p>}
      <span className="script countdown-number" key={count}>
        {count > 0 ? count : 'Smile'}
      </span>
    </div>
  )
}

export default Countdown
