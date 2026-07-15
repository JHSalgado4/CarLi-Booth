function PhotoCard({ photo }) {
  return (
    <div>
      <img
        src={photo.url}
        alt="Wedding"
        style={{
          width: "100%",
          borderRadius: "12px",
        }}
      />
    </div>
  );
}

export default PhotoCard;
