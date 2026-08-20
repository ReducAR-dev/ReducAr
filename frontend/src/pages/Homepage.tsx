import Header from "../components/Header";
import PromoBar from "../components/PromoBar";
import HeroSection from "../components/HeroSection";
import OpportunitiesSection from "../components/OpportunitiesSection";

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