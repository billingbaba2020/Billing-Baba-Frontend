import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import SocialProof from "@/components/social-proof"
import FeaturesOverview from "@/components/features-overview"
import HowItWorks from "@/components/how-it-works"
import Testimonials from "@/components/testimonials"
import PricingSnippet from "@/components/pricing-snippet"
import FinalCTA from "@/components/final-cta"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import BenefitsSection from "@/components/benefits-section" 
import RatingSection from "@/components/rating-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SocialProof />
      <FeaturesOverview />
      <HowItWorks />
       <BenefitsSection />
      <Testimonials />
      {/* <PricingSnippet />
      <FinalCTA /> */}
      <FAQ />
      <RatingSection/>
      <Footer />
    </main>
  )
}
