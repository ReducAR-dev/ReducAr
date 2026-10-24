import PromoBar from "../components/features/PromoBar";
import HeroSection from "../components/features/HeroSection";
import OpportunitiesSection from "../components/features/OpportunitiesSection";
import NosotrosPage from "../pages/mas/NosotrosPage";

function Homepage() {
  return (
    <div className="bg-reducar-bg min-h-screen">
      <PromoBar />
      <HeroSection />
      <OpportunitiesSection />
      <NosotrosPage />
    </div>
  );
}

export default Homepage;