import "./Hero.css";
import Button from "../common/Button";

export default function Hero({ onBegin }) {
  return (
    <section className="hero">
      {/* Header Section */}
      <div className="hero-header">
        <p className="hero-header-text">LIZA AND CARMELO</p>
        
        <div className="hero-header-content">
          <span>L</span>
          <span className="hero-monogram-inline">|</span>
          <span>C</span>
        </div>
        
        <p className="hero-header-date">18TH JULY 2026</p>
      </div>

      {/* Main Title */}
      <h1 className="hero-booth-title">CarLi Booth</h1>
      
      <div className="hero-decorative-line"></div>

      {/* Kicker Text */}
      <p className="hero-kicker">WELCOME TO THE WEDDING OF</p>

      {/* Names */}
      <h2 className="hero-names">Carmelo & Liza</h2>

      {/* Date Divider */}
      <div className="hero-date-divider"></div>
      <p className="hero-date">18TH JULY 2026</p>
      <div className="hero-date-divider"></div>

      {/* Floral Leaf Ornament */}
      <svg className="hero-leaf-ornament" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 5 Q20 10 18 20 Q15 25 10 20 Q8 10 15 5" fill="none" stroke="#5E667D" strokeWidth="1" opacity="0.6" />
        <path d="M15 5 Q10 10 12 20 Q15 25 20 20 Q22 10 15 5" fill="none" stroke="#5E667D" strokeWidth="1" opacity="0.6" />
      </svg>

      {/* Description */}
      <p className="hero-description">
        Capture timeless memories together and create beautiful keepsakes from this special celebration.
      </p>

      {/* Button */}
      <Button onClick={onBegin} className="hero-button">
        BEGIN YOUR EXPERIENCE
      </Button>

      {/* Footer Message */}
      <p className="hero-footer-message">
        WE CAN'T WAIT TO CELEBRATE WITH YOU!
      </p>

      {/* Camera Icon */}
      <svg className="hero-camera-icon" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="28" height="20" rx="2" fill="none" stroke="#5E667D" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="6" fill="none" stroke="#5E667D" strokeWidth="1.5" />
        <circle cx="26" cy="14" r="1.5" fill="#5E667D" />
        <path d="M 12 22 L 15 18" fill="none" stroke="#B89D6A" strokeWidth="1.5" />
      </svg>

    </section>
  );
}