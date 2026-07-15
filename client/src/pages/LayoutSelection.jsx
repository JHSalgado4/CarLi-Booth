import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

function LayoutSelection() {
  const navigate = useNavigate();

  const layouts = [
    {
      id: 1,
      name: "Classic Strip",
    },
    {
      id: 2,
      name: "2x2 Grid",
    },
    {
      id: 3,
      name: "Minimal",
    },
  ];

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>Choose a Layout</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {layouts.map((layout) => (
          <div
            key={layout.id}
            style={{
              width: "220px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h3>{layout.name}</h3>

            <Button
              onClick={() => navigate("/camera")}
            >
              Select
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LayoutSelection;