import { AnnouncementBar } from "@/components/announcement-bar";
import { BrandStory } from "@/components/brand-story";
import { Editorial } from "@/components/editorial";
import { FeatureBanner } from "@/components/feature-banner";
import { FeaturedServices } from "@/components/featured-services";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import {
  ANNOUNCEMENT_MESSAGE,
  HOME_BRAND_STORY,
  HOME_EDITORIAL,
  HOME_FEATURE_BANNER,
  HOME_HERO,
} from "@/constants/home";
import { FEATURED_SERVICES } from "@/constants/services";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 p-3 sm:gap-5 sm:px-6 lg:gap-[30px] lg:px-[43px] lg:pt-[11px]">
      <AnnouncementBar message={ANNOUNCEMENT_MESSAGE} />
      {/* Sticky navbar and page content share this frame, so the navbar sticks for its full height. */}
      <div className="flex flex-col">
        <Navbar />
        <main className="flex flex-col gap-3 sm:gap-5 lg:gap-9">
          {/* First screen: the hero fills the viewport below the announcement bar. */}
          <div className="flex min-h-[calc(100svh-72px)] flex-col sm:min-h-[calc(100svh-80px)] lg:min-h-[calc(100svh-89px)]">
            <Hero {...HOME_HERO} />
          </div>
          <FeaturedServices services={FEATURED_SERVICES} />
          <FeatureBanner {...HOME_FEATURE_BANNER} />
          <Editorial {...HOME_EDITORIAL} />
          <BrandStory {...HOME_BRAND_STORY} />
        </main>
        <Footer className="mt-3 sm:mt-5 lg:mt-9" />
      </div>
    </div>
  );
}
