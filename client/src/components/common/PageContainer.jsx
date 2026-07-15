function PageContainer({ children }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        padding: "40px",
      }}
    >
      {children}
    </main>
  );
}

export default PageContainer;