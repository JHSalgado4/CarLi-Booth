import "./BorderFrame.css";

export default function BorderFrame({ children }) {
  return (
    <div className="border-frame">
      {children}
    </div>
  );
}