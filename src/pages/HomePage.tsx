import { Suspense } from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import HowItWorks from "../components/HowItWorks";
import CreatorFeed from "../components/CreatorFeed";
import BrandMarquee from "../components/BrandMarquee";

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <Hero />
      <BrandMarquee />
      <Categories />
      <HowItWorks />
      <CreatorFeed />
    </Suspense>
  );
}
