import Button from '../components/Button.jsx'
import './Hero.css'

function Hero({ couple, onStart }) {
  return (
    <section className="hero">
      <h1 className="hero-title">CarLi Booth</h1>
      <div className="ornament">✿</div>
      <p className="label">Welcome to the wedding of</p>
      <h2 className="script hero-names">Carmelo &amp; Liza</h2>
      <div className="rule" />
      <p className="label hero-date">{couple.date}</p>

      <p className="hero-copy">
        Capture timeless memories together and create beautiful
        keepsakes from this special celebration.
      </p>

      <Button onClick={onStart}>Begin your experience</Button>

      <div className="rule thin" />
      <p className="label">We can&apos;t wait to celebrate with you!</p>

      <svg className="camera-icon" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.4">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7l1.5-3h5L16 7" />
        <circle cx="12" cy="13.5" r="3.4" />
        <path d="M12 12.1c.8 0 1.4.6 1.4 1.4" strokeLinecap="round" />
      </svg>
    </section>
  )
}

export default Hero
