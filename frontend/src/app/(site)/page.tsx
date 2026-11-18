import { BrandStory } from "@/components/brand-story";
import { Editorial } from "@/components/editorial";
import { FeatureBanner } from "@/components/feature-banner";
import { FeaturedServices } from "@/components/featured-services";
import { Hero } from "@/components/hero";
import { HOME_BRAND_STORY, HOME_EDITORIAL, HOME_FEATURE_BANNER, HOME_HERO } from "@/constants/home";
import { FEATURED_SERVICES } from "@/constants/services";

export default function Home() {
  return (
    <>
      {/* First screen: the hero fills the viewport below the announcement bar. */}
      <div className="flex min-h-[calc(100svh-72px)] flex-col sm:min-h-[calc(100svh-80px)] lg:min-h-[calc(100svh-89px)]">
        <Hero {...HOME_HERO} />
      </div>
      <FeaturedServices services={FEATURED_SERVICES} />
      <FeatureBanner {...HOME_FEATURE_BANNER} />
      <Editorial {...HOME_EDITORIAL} />
      <BrandStory {...HOME_BRAND_STORY} />
    </>
  );
}
