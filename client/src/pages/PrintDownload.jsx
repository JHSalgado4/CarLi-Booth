import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePhotoBooth } from "../context/PhotoBoothContext";
import PaperFrame from "../components/invitation/PaperFrame";
import Button from "../components/common/Button";
import monogramSvg from "../assets/icons/monogram.svg";
import "../styles/print-download.css";

export default function PrintDownload() {
  const navigate = useNavigate();
  const { selectedPhotos, layout, appliedFilters } = usePhotoBooth();
  const stripRef = useRef(null);

  const getFilterStyle = (photoIdx) => {
    const edits = appliedFilters[photoIdx] || {};
    const brightness = edits.brightness || 100;
    const contrast = edits.contrast || 100;
    const saturation = edits.saturation || 100;
    return `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (!stripRef.current) return;

    try {
      // Dynamic import html2canvas
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(stripRef.current, {
        backgroundColor: "#FCFAF7",
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "carli-booth-strip.png";
      link.click();

      navigate("/thank-you");
    } catch (err) {
      console.error("Download error:", err);
      alert("Error downloading image. Please try again.");
    }
  };

  return (
    <PaperFrame>
      <div className="print-container">
        <h2 className="print-title">Your Wedding Keepsake</h2>
        <p className="print-subtitle">Capture this moment</p>

        <div className="print-preview" ref={stripRef}>
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
            <div className="strip-photos single-column">
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

            {/* Monogram */}
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

        <div className="print-options">
          <div className="option-group">
            <h3>Download Your Strip</h3>
            <Button onClick={handleDownload} className="option-btn download-btn">
              ⬇ Download PNG
            </Button>
            <p className="option-note">High-resolution image for sharing</p>
          </div>

          <div className="option-divider"></div>

          <div className="option-group">
            <h3>Print Your Strip</h3>
            <Button onClick={handlePrint} className="option-btn print-btn">
              🖨 Print Strip
            </Button>
            <p className="option-note">Perfect for framing or scrapbooking</p>
          </div>
        </div>

        <div className="print-actions">
          <Button onClick={() => navigate("/thank-you")} className="print-continue">
            Continue
          </Button>
        </div>
      </div>

      <style>{`
        @media print {
          .print-container {
            display: none;
          }
          .print-preview {
            display: block !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
          }
        }
      `}</style>
    </PaperFrame>
  );
}
