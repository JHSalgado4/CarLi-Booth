import "../../styles/invitation.css";

export default function FloralCorner() {
  return (
    <>
      {/* Top Right Flower */}
      <svg className="flower flower-top" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Petal 1 */}
        <ellipse cx="100" cy="40" rx="20" ry="35" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.8" />
        {/* Petal 2 */}
        <ellipse cx="100" cy="40" rx="20" ry="35" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.8" transform="rotate(45 100 100)" />
        {/* Petal 3 */}
        <ellipse cx="100" cy="40" rx="20" ry="35" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.8" transform="rotate(90 100 100)" />
        {/* Petal 4 */}
        <ellipse cx="100" cy="40" rx="20" ry="35" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.8" transform="rotate(135 100 100)" />
        {/* Petal 5 */}
        <ellipse cx="100" cy="40" rx="20" ry="35" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.8" transform="rotate(180 100 100)" />
        {/* Petal 6 */}
        <ellipse cx="100" cy="40" rx="20" ry="35" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.8" transform="rotate(225 100 100)" />
        {/* Stem */}
        <line x1="100" y1="75" x2="100" y2="180" stroke="#5E667D" strokeWidth="1.5" opacity="0.6" />
        {/* Leaves */}
        <path d="M 100 120 Q 85 130 80 150" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.6" />
        <path d="M 100 140 Q 115 145 130 155" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.6" />
      </svg>

      {/* Bottom Left Flower */}
      <svg className="flower flower-bottom" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Petal 1 */}
        <ellipse cx="100" cy="40" rx="20" ry="35" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.8" />
        {/* Petal 2 */}
        <ellipse cx="100" cy="40" rx="20" ry="35" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.8" transform="rotate(45 100 100)" />
        {/* Petal 3 */}
        <ellipse cx="100" cy="40" rx="20" ry="35" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.8" transform="rotate(90 100 100)" />
        {/* Petal 4 */}
        <ellipse cx="100" cy="40" rx="20" ry="35" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.8" transform="rotate(135 100 100)" />
        {/* Petal 5 */}
        <ellipse cx="100" cy="40" rx="20" ry="35" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.8" transform="rotate(180 100 100)" />
        {/* Petal 6 */}
        <ellipse cx="100" cy="40" rx="20" ry="35" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.8" transform="rotate(225 100 100)" />
        {/* Stem */}
        <line x1="100" y1="75" x2="100" y2="180" stroke="#5E667D" strokeWidth="1.5" opacity="0.6" />
        {/* Leaves */}
        <path d="M 100 120 Q 85 130 80 150" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.6" />
        <path d="M 100 140 Q 115 145 130 155" fill="none" stroke="#5E667D" strokeWidth="1.5" opacity="0.6" />
      </svg>
    </>
  );
}