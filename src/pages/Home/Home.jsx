import HeroSection from "../../components/home/HeroSection";
import HighlightsMarquee from "../../components/home/HighlightsMarquee";
import AboutSection from "../../components/home/AboutSection";
import WhyUsSection from "../../components/home/WhyUsSection";
import ActivitiesSection from "../../components/home/ActivitiesSection";
import FacilitiesSection from "../../components/home/FacilitiesSection";
import GallerySection from "../../components/home/GallerySection";
import MapSection from "../../components/home/MapSection";
import ProgramsSection from "../../components/home/ProgramsSection";
import AdmissionCTA from "../../components/home/AdmissionCTA";

// Home = a stack of short teasers. Each one links to its own full page via the Navbar.
function Home() {
  return (
    <>
      <HeroSection />
      <HighlightsMarquee />
      <AboutSection />
      <WhyUsSection />
      <ActivitiesSection />
      <FacilitiesSection />
      <GallerySection />
      <MapSection />
      <ProgramsSection />
      <AdmissionCTA />
    </>
  );
}

export default Home;
