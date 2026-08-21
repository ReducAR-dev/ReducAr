import Header from "../components/common/Header";
import PromoBar from "../components/features/PromoBar";
import HeroSection from "../components/features/HeroSection";
import OpportunitiesSection from "../components/features/OpportunitiesSection";

import "../styles/home-top.css";

function Homepage() {
  return (
    <>
      <Header />
      <PromoBar />
      <HeroSection />

      <OpportunitiesSection />
    </>
  );
}

export default Homepage;