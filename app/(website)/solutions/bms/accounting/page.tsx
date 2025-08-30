import React from "react";
import CaseStudySection from "./components/CaseStudySection";
import ComparisonSection from "./components/ComparisonSection";
import DetailedFaqSection from "./components/DetailedFaqSection";
import ExploreSoftwareSection from "./components/ExploreSoftwareSection";
import IndustriesSection from "./components/IndustriesSection";
import InventoryHeroSection from "./components/InventoryHeroSection";
import PricingSection from "./components/PricingSection";
import RatingSection from "./components/RatingSection";
import TailoredFeaturesSection1 from "./components/TailoredFeaturesSection1";
import TailoredFeaturesSection from "./components/TailoredFeaturesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import WhyUseSection from "./components/WhyUseSection";

// --- The Main Page Component ---
export default function AccountingPage() {
  return (
    <main>
      <InventoryHeroSection />
      <WhyUseSection />
      <IndustriesSection />
      <TailoredFeaturesSection1 />
      <TailoredFeaturesSection />
      <ComparisonSection />
      <CaseStudySection />
      <TestimonialsSection />
      <PricingSection />
      <DetailedFaqSection />
      <ExploreSoftwareSection />
      <RatingSection />
    </main>
  );
}
