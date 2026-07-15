import { useNavigate } from "react-router-dom";

import PaperFrame from "../components/invitation/PaperFrame";
import Hero from "../components/landing/Hero";
import DecorativeBorder from "../components/landing/DecorativeBorder";
import FloralCorner from "../components/landing/FloralCorner";
import InvitationFooter from "../components/landing/InvitationFooter";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <PaperFrame>
      <DecorativeBorder />

      <FloralCorner />

      <Hero onBegin={() => navigate("/layouts")} />

      <InvitationFooter />
    </PaperFrame>
  );
}