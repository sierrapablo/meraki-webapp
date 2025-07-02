import { JSX } from "react";

export default function HeroSection(): JSX.Element {
  return (
    <section className="flex flex-col h-[40dvh] justify-center items-center p-20">
      <h1 className="text-6xl font-bold text-center">
        Merakis
      </h1>
      <h2 className="text-lg text-center">
        Destí de pensaments perduts
      </h2>
    </section >
  );
}
