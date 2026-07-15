import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePhotoBooth } from "../context/PhotoBoothContext";
import PaperFrame from "../components/invitation/PaperFrame";
import Button from "../components/common/Button";
import "../styles/photo-review.css";

export default function PhotoReview() {
  const navigate = useNavigate();
  const { capturedPhotos, setSelectedPhotos, layout } = usePhotoBooth();
  const [selected, setSelected] = useState([]);

  if (!capturedPhotos || capturedPhotos.length === 0) {
    return (
      <PaperFrame>
        <div className="review-container">
          <p>No photos captured. Please go back to camera.</p>
          <Button onClick={() => navigate("/camera")}>Back to Camera</Button>
        </div>
      </PaperFrame>
    );
  }

  const handlePhotoSelect = (index) => {
    setSelected((prev) => {
      const newSelected = [...prev];
      if (newSelected.includes(index)) {
        newSelected.splice(newSelected.indexOf(index), 1);
      } else {
        newSelected.push(index);
      }
      return newSelected;
    });
  };

  const handleRetake = () => {
    navigate("/camera");
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      alert("Please select at least one photo");
      return;
    }
    setSelectedPhotos(selected.map((idx) => capturedPhotos[idx]));
    navigate("/edit");
  };

  return (
    <PaperFrame>
      <div className="review-container">
        <h2 className="review-title">Review Your Photos</h2>
        <p className="review-subtitle">Select the photos you want to include in your strip</p>

        <div className="photos-grid">
          {capturedPhotos.map((photo, index) => (
            <div
              key={index}
              className={`photo-item ${selected.includes(index) ? "selected" : ""}`}
              onClick={() => handlePhotoSelect(index)}
            >
              <img src={photo} alt={`Photo ${index + 1}`} />
              <div className="photo-overlay">
                <div className="photo-number">{index + 1}</div>
              </div>
              {selected.includes(index) && (
                <div className="photo-checkmark">✓</div>
              )}
            </div>
          ))}
        </div>

        <div className="review-info">
          <p>Selected: {selected.length} photo{selected.length !== 1 ? "s" : ""}</p>
        </div>

        <div className="review-actions">
          <Button onClick={handleRetake} className="review-retake">
            Retake Photos
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={selected.length === 0}
            className="review-continue"
          >
            Continue
          </Button>
        </div>
      </div>
    </PaperFrame>
  );
}
