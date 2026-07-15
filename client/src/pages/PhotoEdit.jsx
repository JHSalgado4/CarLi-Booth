import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePhotoBooth } from "../context/PhotoBoothContext";
import PaperFrame from "../components/invitation/PaperFrame";
import Button from "../components/common/Button";
import "../styles/photo-edit.css";

const FILTERS = [
  { id: "original", name: "Original", filter: "" },
  { id: "warm", name: "Warm", filter: "sepia(0.3) saturate(1.2)" },
  { id: "vintage", name: "Vintage", filter: "sepia(0.5) saturate(0.8) contrast(1.1)" },
  { id: "bw", name: "Black & White", filter: "grayscale(1) contrast(1.1)" },
  { id: "soft", name: "Soft Wedding", filter: "brightness(1.1) saturate(0.9)" },
  { id: "romantic", name: "Romantic Glow", filter: "sepia(0.2) saturate(1.3) brightness(1.05)" },
];

export default function PhotoEdit() {
  const navigate = useNavigate();
  const { selectedPhotos, setEditedPhotos, appliedFilters, setAppliedFilters } = usePhotoBooth();

  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [currentFilter, setCurrentFilter] = useState("original");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  if (!selectedPhotos || selectedPhotos.length === 0) {
    return (
      <PaperFrame>
        <div className="edit-container">
          <p>No photos selected. Please go back.</p>
          <Button onClick={() => navigate("/review")}>Back</Button>
        </div>
      </PaperFrame>
    );
  }

  const currentPhoto = selectedPhotos[currentPhotoIdx];

  const getFilterString = () => {
    const baseFilter = FILTERS.find((f) => f.id === currentFilter)?.filter || "";
    const adjustments = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    return `${baseFilter} ${adjustments}`.trim();
  };

  const handleApplyEdits = () => {
    const edits = {
      ...appliedFilters,
      [currentPhotoIdx]: {
        filter: currentFilter,
        brightness,
        contrast,
        saturation,
      },
    };
    setAppliedFilters(edits);

    if (currentPhotoIdx < selectedPhotos.length - 1) {
      const nextIdx = currentPhotoIdx + 1;
      setCurrentPhotoIdx(nextIdx);
      const nextEdits = edits[nextIdx] || {};
      setCurrentFilter(nextEdits.filter || "original");
      setBrightness(nextEdits.brightness || 100);
      setContrast(nextEdits.contrast || 100);
      setSaturation(nextEdits.saturation || 100);
    } else {
      setEditedPhotos(edits);
      navigate("/final");
    }
  };

  const handleReset = () => {
    setCurrentFilter("original");
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  };

  return (
    <PaperFrame>
      <div className="edit-container">
        <h2 className="edit-title">Enhance Your Photo</h2>
        <p className="edit-subtitle">Photo {currentPhotoIdx + 1} of {selectedPhotos.length}</p>

        <div className="edit-preview">
          <img
            src={currentPhoto}
            alt="Editing preview"
            style={{ filter: getFilterString() }}
            className="preview-image"
          />
        </div>

        <div className="edit-filters">
          <h3>Filters</h3>
          <div className="filters-grid">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`filter-btn ${currentFilter === f.id ? "active" : ""}`}
                onClick={() => setCurrentFilter(f.id)}
              >
                <span>{f.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="edit-adjustments">
          <h3>Adjustments</h3>

          <div className="adjustment-group">
            <label>
              Brightness: <span className="value">{brightness}%</span>
            </label>
            <input
              type="range"
              min="50"
              max="150"
              value={brightness}
              onChange={(e) => setBrightness(parseInt(e.target.value))}
              className="slider"
            />
          </div>

          <div className="adjustment-group">
            <label>
              Contrast: <span className="value">{contrast}%</span>
            </label>
            <input
              type="range"
              min="50"
              max="150"
              value={contrast}
              onChange={(e) => setContrast(parseInt(e.target.value))}
              className="slider"
            />
          </div>

          <div className="adjustment-group">
            <label>
              Saturation: <span className="value">{saturation}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="200"
              value={saturation}
              onChange={(e) => setSaturation(parseInt(e.target.value))}
              className="slider"
            />
          </div>
        </div>

        <div className="edit-actions">
          <Button onClick={handleReset} className="edit-reset">
            Reset
          </Button>
          <Button onClick={() => navigate("/review")} className="edit-back">
            Back
          </Button>
          <Button onClick={handleApplyEdits} className="edit-next">
            {currentPhotoIdx < selectedPhotos.length - 1 ? "Next Photo" : "Preview Strip"}
          </Button>
        </div>
      </div>
    </PaperFrame>
  );
}
