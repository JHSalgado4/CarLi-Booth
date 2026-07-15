import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PhotoBoothProvider } from "./context/PhotoBoothContext";

import Landing from "./pages/Landing";
import LayoutSelection from "./pages/LayoutSelection";
import Camera from "./pages/Camera";
import PhotoReview from "./pages/PhotoReview";
import PhotoEdit from "./pages/PhotoEdit";
import FinalStripPreview from "./pages/FinalStripPreview";
import PrintDownload from "./pages/PrintDownload";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <PhotoBoothProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/layouts" element={<LayoutSelection />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/review" element={<PhotoReview />} />
          <Route path="/edit" element={<PhotoEdit />} />
          <Route path="/final" element={<FinalStripPreview />} />
          <Route path="/print" element={<PrintDownload />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
    </PhotoBoothProvider>
  );
}

export default App;