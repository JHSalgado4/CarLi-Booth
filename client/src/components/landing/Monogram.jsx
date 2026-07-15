import monogram from "../../assets/icons/monogram.svg";
import "../../styles/invitation.css";

export default function Monogram() {
    return (
        <div className="monogram">
            <img
            src={monogram}
            alt="Liza & Carmelo Monogram"
            className="hero-monogram"
        />
        </div>
    );
}