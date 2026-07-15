import { useNavigate } from "react-router-dom";
import { usePhotoBooth } from "../context/PhotoBoothContext";
import PaperFrame from "../components/invitation/PaperFrame";
import Button from "../components/common/Button";
import "../styles/thank-you.css";

export default function ThankYou() {
  const navigate = useNavigate();
  const { resetSession } = usePhotoBooth();

  const handleNewSession = () => {
    resetSession();
    navigate("/");
  };

  const handleAnotherStrip = () => {
    resetSession();
    navigate("/layouts");
  };

  return (
    <PaperFrame>
      <div className="thank-you-container">
        {/* Main Message */}
        <div className="thank-you-content">
          <h1 className="thank-you-title">Thank You</h1>

          <div className="thank-you-divider"></div>

          <p className="thank-you-message">
            We are so grateful for you celebrating this special day with us.
          </p>

          <p className="thank-you-subtitle">
            Your beautiful memories will forever be treasured
          </p>

          {/* Decorative Element */}
          <svg className="thank-you-ornament" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5 Q20 10 18 20 Q15 25 10 20 Q8 10 15 5" fill="none" stroke="#5E667D" strokeWidth="1" opacity="0.6" />
            <path d="M15 5 Q10 10 12 20 Q15 25 20 20 Q22 10 15 5" fill="none" stroke="#5E667D" strokeWidth="1" opacity="0.6" />
          </svg>

          <p className="thank-you-closing">
            With all our love,
          </p>

          <h2 className="thank-you-names">
            Carmelo & Liza
          </h2>
        </div>

        {/* Actions */}
        <div className="thank-you-actions">
          <Button onClick={handleAnotherStrip} className="thank-you-another">
            Take Another Photo Strip
          </Button>

          <Button onClick={handleNewSession} className="thank-you-home">
            Return to Home
          </Button>
        </div>

        {/* Heart Animation */}
        <div className="thank-you-hearts">
          <span className="heart">❤</span>
          <span className="heart">❤</span>
          <span className="heart">❤</span>
        </div>
      </div>
    </PaperFrame>
  );
}
