import "./Hero.css";
import Monogram from "./Monogram";
import Button from "../common/Button";

export default function Hero({ onBegin }) {
  return (
    <section className="hero">

      <p className="hero-kicker">
          WELCOME TO THE WEDDING OF
      </p>

      <h1 className="hero-names">
          Carmelo
          <span>&</span>
          Liza
      </h1>

      <Monogram/>

      <p className="hero-date">
          JULY 18, 2026
      </p>

      <p className="hero-description">
          We are delighted to have you celebrate
          our wedding day with us.
          Capture timeless memories and take
          home a keepsake from the
          CarLi Booth.
      </p>

      <Button onClick={onBegin}>
        Begin Your Experience
      </Button>

    </section>
  );
}