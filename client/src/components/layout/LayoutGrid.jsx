import LayoutCard from "./LayoutCard";
import "../../styles/layout.css";

const layouts = [
  {
    id: 1,
    name: "Classic Strip",
    size: "2 × 6",
    photos: 3,
    image: "/layouts/layout1.png",
    description: "Perfect for a timeless strip photo"
  },
  {
    id: 2,
    name: "Floral Strip",
    size: "2 × 6",
    photos: 4,
    image: "/layouts/layout2.png",
    description: "Elegant design with floral accents"
  },
  {
    id: 3,
    name: "Grid",
    size: "4 × 6",
    photos: 6,
    image: "/layouts/layout3.png",
    description: "Classic grid layout for multiple photos"
  },
  {
    id: 4,
    name: "Portrait",
    size: "4 × 6",
    photos: 1,
    image: "/layouts/layout4.png",
    description: "Single portrait shot"
  },
  {
    id: 5,
    name: "Triple",
    size: "4 × 6",
    photos: 3,
    image: "/layouts/layout6.png",
    description: "Three photos beautifully arranged"
  }
];

export default function LayoutGrid({ selected, setSelected }) {
  return (
    <div className="layout-container">
      <h2 className="layout-title">Choose Your Layout</h2>
      <p className="layout-subtitle">Select a design for your photo</p>
      
      <div className="layout-grid">
        {layouts.map((layout) => (
          <LayoutCard
            key={layout.id}
            layout={layout}
            selected={selected?.id === layout.id}
            onSelect={() => setSelected(layout)}
          />
        ))}
      </div>
    </div>
  );
}