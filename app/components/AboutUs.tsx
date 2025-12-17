"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface AboutUsProps {
  language?: "en" | "he";
}

export default function AboutUs({ language = "en" }: AboutUsProps) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImg, setCurrentImg] = useState<0 | 1>(0);
  const [prevImg, setPrevImg] = useState<0 | 1 | null>(null);

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

  // Slide images similar to hero: one image fills, then slides left, next slides in from right
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => {
        setPrevImg(prev);
        return prev === 0 ? 1 : 0;
      });
    }, 2000); // stay a little longer (~2s)
    return () => clearInterval(interval);
  }, []);

  const copy = {
    en: {
      title: "About Us",
      body:
        "Our academy specializes in teaching mathematics and core academic subjects, offering private and group lessons tailored to each student's level and personal needs. At our academy, every student receives close guidance, a personalized learning plan, and innovative teaching methods that make complex topics simple and clear. Through personal attention, patience, and professional mentoring, we help students build confidence, achieve deep understanding, and gain practical tools for success. We believe there's no such thing as a student who cannot succeed — only one who hasn't yet received the right guidance.",
    },
    he: {
      title: "עלינו",
      body:
        "האקדמיה שלנו מתמחה בהוראת מתמטיקה ומקצועות לימוד מרכזיים, ומעניקה שיעורים פרטיים וקבוצתיים המותאמים לכל תלמיד לפי רמתו וצרכיו האישיים. באקדמיה שלנו כל תלמיד זוכה לליווי צמוד, תוכנית לימודים אישית ושיטות הוראה חדשניות ההופכות נושאים מורכבים לפשוטים וברורים. באמצעות יחס אישי, סבלנות והכוונה מקצועית, אנו עוזרים לתלמידים לפתח ביטחון בלמידה, להבין לעומק את החומר ולרכוש כלים אמיתיים להצלחה. באקדמיה שלנו אנו מאמינים שאין תלמיד שלא יכול – יש רק תלמיד שעדיין לא קיבל את ההכוונה הנכונה.",
    },
  } as const;

  const t = copy[language];

  return (
    <section className="w-full bg-white pt-12 pb-20 px-4">
      <div
        ref={containerRef}
        className={`max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Text */}
        <div className="pl-8 md:pl-12 lg:pl-16">
          <h2 className="font-[family-name:var(--font-montserrat)] text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            {t.title}
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-base md:text-2xl leading-relaxed text-gray-700">
            {t.body}
          </p>
        </div>

        {/* Images container - hero-style full swap */}
        <div className="relative w-full max-w-lg mx-auto">
          <div className="relative h-[320px] md:h-[400px] lg:h-[440px] rounded-2xl overflow-hidden bg-gray-100">
            {/* Previous image sliding out to the left */}
            {prevImg !== null && (
              <Image
                key={`prev-${prevImg}`}
                src={prevImg === 0 ? "/AboutUs1.webp" : "/AboutUs2.webp"}
                alt={prevImg === 0 ? "Academy student" : "Graduation moment"}
                fill
                sizes="(max-width: 768px) 90vw, 45vw"
                className={`object-cover object-top w-full h-full ${visible ? (currentImg === 1 ? "slide-out" : "slide-out-right") : ""}`}
                priority
              />
            )}

            {/* Current image sliding in from the right */}
            <Image
              key={`curr-${currentImg}`}
              src={currentImg === 0 ? "/AboutUs1.webp" : "/AboutUs2.webp"}
              alt={currentImg === 0 ? "Academy student" : "Graduation moment"}
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              className={`object-cover object-top w-full h-full ${visible ? (currentImg === 1 ? "slide-in" : "slide-in-left") : ""}`}
              priority
            />
            {/* Light overlay for consistency with hero */}
            <div className="absolute inset-0 bg-black/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
