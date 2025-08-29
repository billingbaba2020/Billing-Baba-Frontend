import RatingSection from "@/components/website/rating-section";
import AboutHero from "./AboutHero";
import AccountingSoftwareSection from "./AccountingSoftwareSection";
import AppInfoSection from "./AppInfoSection";
import BusinessInfoSection from "./BusinessInfoSection";
import EffortlessBusinessSection from "./EffortlessBusinessSection";
import RecognitionSection from "./RecognitionSection";
import TechnologySection from "./TechnologySection";

export default function AboutPage() {
    return (
        <div>
            <AboutHero />
            <AccountingSoftwareSection />
            <TechnologySection />
            <BusinessInfoSection />
            <AppInfoSection />
            <EffortlessBusinessSection />
            <RecognitionSection />
            <RatingSection />
        </div>
    )
}