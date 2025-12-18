"use client";

import Image from "next/image";
import Header from "./components/Header";
import WhyAcademy from "./components/WhyAcademy";
import AboutUs from "./components/AboutUs";
import BookCall from "./components/BookCall";
import Founders from "./components/Founders";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentBg, setCurrentBg] = useState(0);
  const [prevBg, setPrevBg] = useState<number | null>(null);
  const [language, setLanguage] = useState("English");
  const [heroLoaded, setHeroLoaded] = useState(false);
  const backgrounds = ["/HeroBg1.webp", "/HeroBg2.webp", "/HeroBg3.webp"];

  const isHebrew = language === "Hebrew";

  const heroContent = {
    en: {
      title: "A+ Academy",
      tagline: '"Unlock Your Potential"',
      description:
        "Our vision is to guide every student toward reaching their full potential, at their own pace, in their own way, and with a true sense of achievement.",
      cta: "Get Started",
    },
    he: {
      title: "A+ Academy",
      tagline: '"פתח את הפוטנציאל שלך"',
      description:
        "החזון שלנו הוא ללוות כל תלמיד עד למימוש הפוטנציאל האישי שלו, בקצב המתאים לו, בדרך שלו, ועם חוויית הצלחה אמיתית.",
      cta: "התחל עכשיו",
    },
  };

  const currentLang = isHebrew ? "he" : "en";

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  // Trigger hero animations after mount
  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentBg >= backgrounds.length - 1) {
      return;
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
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-40 max-w-5xl mt-56"
          dir={isHebrew ? "rtl" : "ltr"}
        >
          {/* Title */}
          <h1
            className={`font-[family-name:var(--font-playfair)] text-white text-3xl md:text-4xl lg:text-5xl font-[500] mb-3 tracking-tight transition-all duration-700 ${
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            {heroContent[currentLang].title}
          </h1>

          {/* Tagline */}
          <h2
            className={`font-[family-name:var(--font-playfair)] text-white text-2xl md:text-4xl lg:text-5xl font-[500] mb-8 tracking-wide transition-all duration-700 ${
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            {heroContent[currentLang].tagline}
          </h2>

          {/* Description */}
          <p
            className={`font-[family-name:var(--font-poppins)] text-white text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl opacity-95 px-4 transition-all duration-700 ${
              heroLoaded
                ? "opacity-95 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.6s" }}
          >
            {heroContent[currentLang].description}
          </p>

          {/* CTA Button */}
          <button
            className={`font-[family-name:var(--font-montserrat)] bg-[#008A01] hover:bg-[#00800F] text-white text-base md:text-lg font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 mb-10 btn-shine animate-pulse-glow ${
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.8s" }}
          >
            {heroContent[currentLang].cta}
          </button>

          {/* Social Media Icons */}
          <div
            className={`flex gap-6 items-center justify-center mt-6 transition-all duration-700 ${
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1s" }}
          >
            <a href="#" className="icon-hover cursor-pointer">
              <Image
                src="/Icons/facebook.svg"
                alt="Facebook"
                width={40}
                height={40}
              />
            </a>
            <a href="#" className="icon-hover cursor-pointer">
              <Image
                src="/Icons/linkedin.svg"
                alt="LinkedIn"
                width={40}
                height={40}
              />
            </a>
            <a href="#" className="icon-hover cursor-pointer">
              <Image
                src="/Icons/instagram.svg"
                alt="Instagram"
                width={40}
                height={40}
              />
            </a>
            <a href="#" className="icon-hover cursor-pointer">
              <Image
                src="/Icons/youtube.svg"
                alt="YouTube"
                width={40}
                height={40}
              />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
              heroLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "1.2s" }}
          >
            <div className="flex flex-col items-center animate-scroll-indicator">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </main>

      {/* Why Academy Section */}
      <WhyAcademy language={language === "Hebrew" ? "he" : "en"} />

      {/* About Us Section */}
      <AboutUs language={language === "Hebrew" ? "he" : "en"} />

      {/* Book Call Section */}
      <BookCall language={language === "Hebrew" ? "he" : "en"} />

      {/* Founders Section */}
      <Founders language={language === "Hebrew" ? "he" : "en"} />

      {/* Footer */}
      <Footer language={language === "Hebrew" ? "he" : "en"} />
    </>
  );
}
