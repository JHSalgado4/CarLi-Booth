import { useNavigate } from "react-router-dom";
import { usePhotoBooth } from "../context/PhotoBoothContext";
import PaperFrame from "../components/invitation/PaperFrame";
import Button from "../components/common/Button";
import monogramSvg from "../assets/icons/monogram.svg";
import "../styles/final-strip.css";

export default function FinalStripPreview() {
  const navigate = useNavigate();
  const { selectedPhotos, layout, appliedFilters } = usePhotoBooth();

  if (!selectedPhotos || selectedPhotos.length === 0 || !layout) {
    return (
      <PaperFrame>
        <div className="final-container">
          <p>Missing required data. Please start over.</p>
          <Button onClick={() => navigate("/layouts")}>Back to Layout</Button>
        </div>
      </PaperFrame>
    );
  }

  const getFilterStyle = (photoIdx) => {
    const edits = appliedFilters[photoIdx] || {};
    const brightness = edits.brightness || 100;
    const contrast = edits.contrast || 100;
    const saturation = edits.saturation || 100;
    return `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
  };

  return (
    <PaperFrame>
      <div className="final-container">
        <h2 className="final-title">Your Wedding Keepsake</h2>

        <div className="final-preview">
          <div className="strip-wrapper">
            {/* Decorative Corner - Top Right */}
            <div className="corner-decoration corner-top-right">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <path d="M40 10 Q50 20 45 35 Q40 45 30 50 Q35 40 40 30 Q38 20 40 10" stroke="#5E667D" strokeWidth="1.5" fill="none"/>
                <circle cx="40" cy="15" r="3" fill="#5E667D"/>
                <circle cx="45" cy="30" r="2.5" fill="#5E667D"/>
                <circle cx="35" cy="45" r="2.5" fill="#5E667D"/>
              </svg>
            </div>

            {/* Header */}
            <div className="strip-header">
              <p className="strip-couple">Liza and Carmelo</p>
              <p className="strip-date">18TH JULY 2026</p>
            </div>

            {/* Photos - Single Column */}
            <div className="strip-photos">
              {selectedPhotos.map((photo, idx) => (
                <div key={idx} className="strip-photo">
                  <img
                    src={photo}
                    alt={`Photo ${idx + 1}`}
                    style={{ filter: getFilterStyle(idx) }}
                  />
                </div>
              ))}
            </div>

            {/* Monogram & Branding */}
            <div className="strip-branding">
              <img src={monogramSvg} alt="Monogram" className="strip-monogram" />
              <p className="strip-text">CarLi Booth</p>
            </div>

            {/* Footer */}
            <div className="strip-footer">
              <div className="footer-content">
                <p className="footer-left">@yourphotostudio</p>
                <p className="footer-right">Thank you for celebrating with us!</p>
              </div>
            </div>

            {/* Decorative Corner - Bottom Left */}
            <div className="corner-decoration corner-bottom-left">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <path d="M20 70 Q25 55 35 50 Q40 45 50 40 Q35 48 25 60 Q18 68 20 70" stroke="#5E667D" strokeWidth="1.5" fill="none"/>
                <circle cx="25" cy="65" r="3" fill="#5E667D"/>
                <circle cx="35" cy="50" r="2.5" fill="#5E667D"/>
                <circle cx="48" cy="42" r="2.5" fill="#5E667D"/>
              </svg>
            </div>

            {/* Decorative Border */}
            <div className="strip-border"></div>
          </div>
        </div>

        <div className="final-actions">
          <Button onClick={() => navigate("/edit")} className="final-back">
            Edit Photos
          </Button>
          <Button onClick={() => navigate("/print")} className="final-continue">
            Download & Print
          </Button>
        </div>
      </div>
    </PaperFrame>
  );
}
