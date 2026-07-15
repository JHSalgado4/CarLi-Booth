function LayoutCard({
  layout,
  selected,
  onSelect,
}) {
  return (
    <div
      onClick={() => onSelect(layout)}
      style={{
        width: "220px",
        padding: "18px",
        borderRadius: "18px",
        cursor: "pointer",
        background: "#fff",
        border: selected
          ? "3px solid #C79A6D"
          : "2px solid #ECECEC",
        transition: ".25s",
        boxShadow: selected
          ? "0 8px 25px rgba(199,154,109,.25)"
          : "0 3px 10px rgba(0,0,0,.05)",
      }}
    >
      <img
        src={layout.image}
        alt={layout.name}
        style={{
          width: "100%",
          borderRadius: "10px",
        }}
      />

      <h3>{layout.name}</h3>

      <p>{layout.size}</p>

      <p>{layout.photos} Photos</p>
    </div>
  );
}

export default LayoutCard;