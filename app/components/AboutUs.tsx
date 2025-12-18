"use client";

import { useEffect, useRef, useState } from "react";

interface AboutUsProps {
  language?: "en" | "he";
}

export default function AboutUs({ language = "en" }: AboutUsProps) {
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
      title: "About Us",
      body: "Our academy specializes in teaching mathematics and core academic subjects, offering private and group lessons tailored to each student's level and personal needs. At our academy, every student receives close guidance, a personalized learning plan, and innovative teaching methods that make complex topics simple and clear. Through personal attention, patience, and professional mentoring, we help students build confidence, achieve deep understanding, and gain practical tools for success. We believe there's no such thing as a student who cannot succeed — only one who hasn't yet received the right guidance.",
      stats: [
        { number: "77+", label: "Years Combined Experience" },
        { number: "1000+", label: "Students Taught" },
        { number: "98%", label: "Success Rate" },
      ],
    },
    he: {
      title: "עלינו",
      body: "האקדמיה שלנו מתמחה בהוראת מתמטיקה ומקצועות לימוד מרכזיים, ומעניקה שיעורים פרטיים וקבוצתיים המותאמים לכל תלמיד לפי רמתו וצרכיו האישיים. באקדמיה שלנו כל תלמיד זוכה לליווי צמוד, תוכנית לימודים אישית ושיטות הוראה חדשניות ההופכות נושאים מורכבים לפשוטים וברורים. באמצעות יחס אישי, סבלנות והכוונה מקצועית, אנו עוזרים לתלמידים לפתח ביטחון בלמידה, להבין לעומק את החומר ולרכוש כלים אמיתיים להצלחה. באקדמיה שלנו אנו מאמינים שאין תלמיד שלא יכול – יש רק תלמיד שעדיין לא קיבל את ההכוונה הנכונה.",
      stats: [
        { number: "77+", label: "שנות ניסיון משולבות" },
        { number: "1000+", label: "תלמידים שלמדו" },
        { number: "98%", label: "אחוז הצלחה" },
      ],
    },
  } as const;

  const t = copy[language];
  const isHebrew = language === "he";

  return (
    <section
      id="about"
      className="w-full bg-gradient-to-b from-white to-gray-50 py-20 px-4"
      dir={isHebrew ? "rtl" : "ltr"}
    >
      <div
        ref={containerRef}
        className={`max-w-5xl mx-auto transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Title */}
        <h2
          className={`font-[family-name:var(--font-montserrat)] text-4xl md:text-5xl font-semibold text-gray-900 mb-8 text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          {t.title}
        </h2>

        {/* Decorative line */}
        <div
          className={`w-24 h-1 bg-[#008A01] mx-auto mb-10 rounded-full transition-all duration-700 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          style={{ transitionDelay: "0.2s" }}
        />

        {/* Body text */}
        <p
          className={`font-[family-name:var(--font-montserrat)] text-lg md:text-xl leading-relaxed text-gray-700 text-center max-w-4xl mx-auto mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.3s" }}
        >
          {t.body}
        </p>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          {t.stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 card-hover transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="font-[family-name:var(--font-montserrat)] text-5xl md:text-6xl font-bold text-[#008A01] mb-3">
                {stat.number}
              </div>
              <div className="font-[family-name:var(--font-montserrat)] text-gray-600 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
