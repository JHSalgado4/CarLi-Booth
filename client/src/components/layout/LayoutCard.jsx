import "../../styles/layout.css";

function LayoutCard({
  layout,
  selected,
  onSelect,
}) {
  return (
    <div
      className={`layout-card ${selected ? 'layout-card-selected' : ''}`}
      onClick={() => onSelect()}
    >
      <div className="layout-card-image-wrapper">
        <img
          src={layout.image}
          alt={layout.name}
          className="layout-card-image"
        />
        {selected && <div className="layout-card-checkmark">✓</div>}
      </div>

      <div className="layout-card-content">
        <h3 className="layout-card-name">{layout.name}</h3>
        
        <div className="layout-card-details">
          <span className="layout-card-size">{layout.size}</span>
          <span className="layout-card-divider">•</span>
          <span className="layout-card-photos">{layout.photos} Photo{layout.photos !== 1 ? 's' : ''}</span>
        </div>

        {layout.description && (
          <p className="layout-card-description">{layout.description}</p>
        )}
      </div>
    </div>
  );
}

export default LayoutCard;