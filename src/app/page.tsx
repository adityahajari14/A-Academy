"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutAcademy from "@/components/AboutAcademy";
import WhyAcademySection from "@/components/WhyAcademySection";
import ContactForm from "@/components/ContactForm";
import Founders from "@/components/Founders";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [language, setLanguage] = useState("Hebrew");
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  useEffect(() => {
    // Check if video can play after a timeout
    const checkVideoLoad = setTimeout(() => {
      if (videoRef.current && !videoLoaded && !videoError) {
        // Check if video is having trouble loading
        if (videoRef.current.readyState === 0) {
          // Video hasn't started loading after 5 seconds - use fallback
          handleVideoError();
        }
      }
    }, 5000);

    return () => {
      clearTimeout(checkVideoLoad);
    };
  }, [videoLoaded, videoError]);

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
          {/* Fallback Image */}
          {videoError && (
            <Image
              src="/hero-img.webp"
              alt="A+ Academy Hero"
              fill
              priority
              className="absolute w-full h-full object-cover"
              style={{
                objectPosition: 'center top',
              }}
              quality={90}
            />
          )}
          
          {/* Video */}
          {!videoError && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/hero-img.webp"
              className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
                videoLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{
                objectPosition: 'center top',
              }}
              onError={handleVideoError}
              onLoadedData={handleVideoLoaded}
              onCanPlay={handleVideoLoaded}
              onStalled={() => {
                // If video stalls, try fallback after 3 seconds
                setTimeout(() => {
                  if (videoRef.current && videoRef.current.readyState < 3) {
                    handleVideoError();
                  }
                }, 3000);
              }}
            >
              <source src="/hero-video.mp4" type="video/mp4" />
              {/* Fallback message for browsers that don't support video */}
              Your browser does not support the video tag.
            </video>
          )}
          
          {/* Show fallback image while video is loading */}
          {!videoError && !videoLoaded && (
            <Image
              src="/hero-img.webp"
              alt="A+ Academy Hero"
              fill
              priority
              className="absolute w-full h-full object-cover transition-opacity duration-500"
              style={{
                objectPosition: 'center top',
              }}
              quality={90}
            />
          )}
          
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
        <Founders language={language === "Hebrew" ? "he" : "en"} />
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
