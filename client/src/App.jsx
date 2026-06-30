import { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileChange(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
  }

  async function uploadImage() {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      const response = await fetch("http://localhost:3000/api/photos", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log(data);
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>📸 CarLi Booth</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <br />
      <br />

      {selectedFile && (
        <>
          <h3>Selected File</h3>
          <p>{selectedFile.name}</p>
          <p>{Math.round(selectedFile.size / 1024)} KB</p>
        </>
      )}

      <button onClick={uploadImage}>
        Upload Image
      </button>
    </div>
  );
}

export default App;