"use client";

import Image from "next/image";
import Header from "./components/Header";
import WhyAcademy from "./components/WhyAcademy";
import AboutUs from "./components/AboutUs";
import Founders from "./components/Founders";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentBg, setCurrentBg] = useState(0);
  const [prevBg, setPrevBg] = useState<number | null>(null);
  const [language, setLanguage] = useState("English");
  const backgrounds = ["/HeroBg1.webp", "/HeroBg2.webp", "/HeroBg3.webp"];

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  useEffect(() => {
    if (currentBg >= backgrounds.length - 1) {
      return; // Stop at bg3
    }

    const interval = setInterval(() => {
      setCurrentBg((prev) => {
        if (prev >= backgrounds.length - 1) {
          return backgrounds.length - 1;
        }
        setPrevBg(prev);
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [currentBg]);
  return (
    <>
      <main className="relative h-[92vh] w-full flex items-center justify-center overflow-hidden">
        {/* Header */}
        <Header
          onLanguageChange={handleLanguageChange}
          selectedLanguage={language}
        />
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Previous image sliding out to the left */}
          {prevBg !== null && (
            <Image
              key={`prev-${prevBg}`}
              src={backgrounds[prevBg]}
              alt="Previous Background"
              fill
              className="object-cover object-top w-full h-full slide-out opacity-60"
              priority
            />
          )}
          {/* Current image sliding in from the right */}
          <Image
            key={`curr-${currentBg}`}
            src={backgrounds[currentBg]}
            alt="Academy Background"
            fill
            className="object-cover object-top w-full h-full slide-in opacity-60"
            priority
          />
          {/* Black overlay to darken image */}
          <div className="absolute inset-0 bg-black opacity-70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-40 max-w-5xl mt-48">
          {/* Title */}
          <h1 className="font-[family-name:var(--font-playfair)] text-white text-3xl md:text-4xl lg:text-5xl font-medium mb-3 tracking-tight">
            A+ Academy
          </h1>

          {/* Tagline */}
          <h2 className="font-[family-name:var(--font-playfair)] text-white text-2xl md:text-4xl lg:text-5xl font-medium mb-8 tracking-wide">
            “Where progress begins.”
          </h2>

          {/* Description */}
          <p className="font-[family-name:var(--font-poppins)] text-white text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl opacity-95 px-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </p>

          {/* CTA Button */}
          <button className="font-[family-name:var(--font-montserrat)] bg-[#008A01] hover:bg-[#00800F] text-white text-base md:text-lg font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mb-20">
            Get Started
          </button>

          {/* Social Media Icons */}
          <div className="flex gap-6 items-center justify-center mt-6">
            <Image
              src="/Icons/facebook.svg"
              alt="Facebook"
              width={40}
              height={40}
            />
            <Image
              src="/Icons/linkedin.svg"
              alt="LinkedIn"
              width={40}
              height={40}
            />
            <Image
              src="/Icons/instagram.svg"
              alt="Instagram"
              width={40}
              height={40}
            />
            <Image
              src="/Icons/youtube.svg"
              alt="YouTube"
              width={40}
              height={40}
            />
          </div>
        </div>
      </main>

      {/* Why Academy Section */}
      <WhyAcademy language={language === "Hebrew" ? "he" : "en"} />

      {/* About Us Section */}
      <AboutUs language={language === "Hebrew" ? "he" : "en"} />

      {/* Founders Section */}
      <Founders />

      {/* Footer */}
      <Footer />
    </>
  );
}
