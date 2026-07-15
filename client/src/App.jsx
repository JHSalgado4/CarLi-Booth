import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import LayoutSelection from "./pages/LayoutSelection";
import Camera from "./pages/Camera";
import EditPhoto from "./pages/EditPhoto";
import FinalPhoto from "./pages/FinalPhoto";
import LiveGallery from "./pages/LiveGallery";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/layouts" element={<LayoutSelection />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/edit" element={<EditPhoto />} />
        <Route path="/final" element={<FinalPhoto />} />
        <Route path="/gallery" element={<LiveGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;