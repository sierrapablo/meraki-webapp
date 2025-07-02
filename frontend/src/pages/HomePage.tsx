import { JSX } from "react";
import HeroSection from "../components/HeroSection";
import PostCarousel from "../components/PostCarousel";

export default function HomePage(): JSX.Element {
  return (
    <div className="flex flex-col h-dvh bg-neutral-100">
      <HeroSection />
      <PostCarousel />
    </div>
  );
};