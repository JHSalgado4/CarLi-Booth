function Modal({ children }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          minWidth: "300px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;