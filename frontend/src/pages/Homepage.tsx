// src/pages/Homepage.tsx
import PromoBar from "../components/features/PromoBar";
import HeroSection from "../components/features/HeroSection";
import OpportunitiesSection from "../components/features/OpportunitiesSection";

function Homepage() {
  return (
    <div className="bg-reducar-bg min-h-screen">
      <PromoBar />
      <HeroSection />
      <OpportunitiesSection />
    </div>
  );
}

export default Homepage;