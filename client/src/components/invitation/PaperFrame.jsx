export default function PaperFrame({ children }) {
  return (
    <main className="paper">
      <div className="paper-card">
        {children}
      </div>
    </main>
  );
}