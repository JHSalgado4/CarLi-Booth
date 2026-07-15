import { createContext, useContext, useState } from 'react';

const PhotoBoothContext = createContext();

export function PhotoBoothProvider({ children }) {
  const [layout, setLayout] = useState(null);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [editedPhotos, setEditedPhotos] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});

  const resetSession = () => {
    setLayout(null);
    setCapturedPhotos([]);
    setSelectedPhotos([]);
    setEditedPhotos({});
    setAppliedFilters({});
  };

  const value = {
    // Layout
    layout,
    setLayout,

    // Photos
    capturedPhotos,
    setCapturedPhotos,
    selectedPhotos,
    setSelectedPhotos,

    // Editing
    editedPhotos,
    setEditedPhotos,
    appliedFilters,
    setAppliedFilters,

    // Session
    resetSession,
  };

  return (
    <PhotoBoothContext.Provider value={value}>
      {children}
    </PhotoBoothContext.Provider>
  );
}

export function usePhotoBooth() {
  const context = useContext(PhotoBoothContext);
  if (!context) {
    throw new Error('usePhotoBooth must be used within PhotoBoothProvider');
  }
  return context;
}
