"use client";

import { useEffect, useRef, useState } from "react";

interface BookCallProps {
  language?: "en" | "he";
}

export default function BookCall({ language = "en" }: BookCallProps) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.2 }
    );
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const copy = {
    en: {
      title: "Ready to Get Started?",
      subtitle: "Book a free consultation call with our academic advisors",
      cta: "Schedule a Call",
      calendlyUrl: "https://calendly.com/shukl-ember/30min",
    },
    he: {
      title: "מוכנים להתחיל?",
      subtitle: "קבעו שיחת ייעוץ חינם עם היועצים האקדמיים שלנו",
      cta: "קביעת שיחה",
      calendlyUrl: "https://calendly.com/shukl-ember/30min",
    },
  } as const;

  const t = copy[language];

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div
        ref={containerRef}
        className={`max-w-screen-lg mx-auto text-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Title */}
        <h2 className="font-[family-name:var(--font-montserrat)] text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
          {t.title}
        </h2>

        {/* Subtitle */}
        <p className="font-[family-name:var(--font-montserrat)] text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          {t.subtitle}
        </p>

        {/* CTA Button */}
        <a
          href={t.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-[family-name:var(--font-montserrat)] bg-[#008A01] hover:bg-[#00800F] text-white text-lg md:text-xl font-semibold px-12 py-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {t.cta}
        </a>

        {/* Optional: Small note */}
        <p className="font-[family-name:var(--font-montserrat)] text-sm text-gray-500 mt-6">
          {language === "en"
            ? "No commitment required • 30-minute session"
            : "ללא התחייבות • שיחה של 30 דקות"}
        </p>
      </div>
    </section>
  );
}
