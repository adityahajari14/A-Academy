"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutAcademy from "@/components/AboutAcademy";
import WhyAcademySection from "@/components/WhyAcademySection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";

export default function Home() {
  const [language, setLanguage] = useState("English");
  const [isLoading, setIsLoading] = useState(true);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <main className="relative min-h-screen h-screen w-full overflow-hidden">
        {/* Header */}
        <Header
          onLanguageChange={handleLanguageChange}
          selectedLanguage={language}
        />

        {/* Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
            style={{
              objectPosition: 'center top',
            }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlay - transparent to black */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        </div>

        {/* Hero Content */}
        <Hero
          language={language === "Hebrew" ? "he" : "en"}
          onLanguageChange={handleLanguageChange}
        />
      </main>

      {/* About Academy Section */}
      <section id="about">
        <AboutAcademy language={language === "Hebrew" ? "he" : "en"} />
      </section>

      {/* Why Academy Section */}
      <WhyAcademySection language={language === "Hebrew" ? "he" : "en"} />

      {/* Contact Form Section */}
      <section id="contact">
        <ContactForm language={language === "Hebrew" ? "he" : "en"} />
      </section>

      {/* Footer */}
      <Footer language={language === "Hebrew" ? "he" : "en"} />
    </>
  );
}
