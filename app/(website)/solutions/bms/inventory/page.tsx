import React from "react";

// Step 1: Sabhi section components ko import karein
// Yeh maana ja raha hai ki saare components 'components' sub-folder ke andar hain.
import InventoryHeroSection from "./components/InventoryHeroSection";
import InventoryFeaturesSection from "./components/InventoryFeaturesSection";
import ServingIndustriesSection from "./components/ServingIndustriesSection";
import GstComplianceSection from "./components/GstComplianceSection";
import IntegrationsSection from "./components/IntegrationsSection";
import ProductDemoSection from "./components/ProductDemoSection";
import InventoryTestimonials from "./components/InventoryTestimonials";
import SuccessStorySection from "./components/SuccessStorySection";
import InventoryFaqSection from "./components/InventoryFaqSection";
import InventoryRatingSection from "./components/InventoryRatingSection";

// Step 2: Page component banayein aur usmein saare sections ko use karein
export default function InventoryPage() {
  return (
    <main>
      <InventoryHeroSection />
      <InventoryFeaturesSection />
      <ServingIndustriesSection />
      <GstComplianceSection />
      <IntegrationsSection />
      <InventoryTestimonials />
      <ProductDemoSection />
      <SuccessStorySection />
      <InventoryFaqSection />
      <InventoryRatingSection />
    </main>
  );
}
