"use client";

import { useState, useEffect, useRef } from "react";

interface FounderContent {
  name: string;
  title: string;
  bio: string;
  initials: string;
}

interface Founder {
  id: number;
  en: FounderContent;
  he: FounderContent;
}

const foundersData: Founder[] = [
  {
    id: 1,
    en: {
      name: "Iman Tanous",
      title: "Mathematics Expert",
      bio: "Holds a Bachelor's degree in Mathematics and Computer Science from the University of Haifa, with over 33 years of experience preparing students for Bagrut exams in mathematics. An expert in teaching the 3, 4, and 5-unit levels, Iman guides students toward success through a combination of professionalism, patience, and a deep understanding of each student's individual needs.",
      initials: "IT",
    },
    he: {
      name: "אימאן טנוס",
      title: "מומחית מתמטיקה",
      bio: "בעלת תואר ראשון במתמטיקה ומדעי המחשב מאוניברסיטת חיפה, עם ניסיון של מעל 33 שנה בהכנה לבגרויות במתמטיקה. מומחית בהוראת 3, 4 ו-5 יחידות לימוד, ומלווה תלמידים להצלחה תוך שילוב של מקצועיות, סבלנות והבנה עמוקה של צורכי כל תלמיד ותלמידה.",
      initials: "אט",
    },
  },
  {
    id: 2,
    en: {
      name: "Rudina Sosan",
      title: "Mathematics Specialist",
      bio: "Holds a Bachelor's degree in Mathematics from the Hebrew University of Jerusalem, with 44 years of extensive experience teaching mathematics and preparing students for Bagrut exams in various schools. Specializing in the 3, 4, and 5-unit levels, Rudina brings an educational approach that blends deep knowledge, empathy, and a commitment to student success.",
      initials: "RS",
    },
    he: {
      name: "רודינה סוסאן",
      title: "מומחית מתמטיקה",
      bio: "בעלת תואר ראשון במתמטיקה מהאוניברסיטה העברית בירושלים, עם ניסיון עשיר של 44 שנים בהוראת מתמטיקה והכנה לבגרויות בבתי ספר שונים. מתמחה בהוראת 3, 4 ו-5 יחידות לימוד, ומביאה איתה גישה חינוכית שמחברת בין ידע עמוק, הכלה, והובלה להצלחה.",
      initials: "רס",
    },
  },
];

interface FoundersProps {
  language?: "en" | "he";
}

export default function Founders({ language = "en" }: FoundersProps) {
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

  const lang = language as "en" | "he";
  const isHebrew = lang === "he";

  const copy = {
    en: {
      title: "Meet Our Founders",
      subtitle:
        "Two passionate educators with decades of experience dedicated to helping students succeed in mathematics.",
    },
    he: {
      title: "הכירו את המייסדות שלנו",
      subtitle:
        "שתי מחנכות נלהבות עם עשרות שנות ניסיון המסורות לסייע לתלמידים להצליח במתמטיקה.",
    },
  } as const;

  const t = copy[lang];

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-start px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-14 md:py-20 lg:py-24 w-full bg-white"
      dir={isHebrew ? "rtl" : "ltr"}
    >
      <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 items-start w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="w-full">
          <h2
            className={`font-[family-name:var(--font-open-sans)] font-normal text-2xl sm:text-3xl md:text-[38px] lg:text-[42px] leading-[1.33] text-black w-full transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.1s" }}
          >
            {t.title}
          </h2>
          <p
            className={`font-[family-name:var(--font-open-sans)] font-light text-sm sm:text-base md:text-lg lg:text-xl leading-[1.51] text-black w-full mt-4 sm:mt-5 md:mt-6 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full mt-6 sm:mt-8">
          {foundersData.map((founder, index) => (
            <div
              key={founder.id}
              className={`bg-gradient-to-br from-[#008A01] to-[#006B01] rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 lg:p-10 text-white shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
            >
              {/* Initials Avatar */}
              <div className="flex items-start gap-4 sm:gap-5 md:gap-6 mb-5 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border-2 border-white/30">
                  <span className="font-[family-name:var(--font-open-sans)] text-xl sm:text-2xl font-semibold text-white">
                    {founder[lang].initials}
                  </span>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-open-sans)] text-xl sm:text-2xl md:text-3xl font-semibold mb-1 text-white">
                    {founder[lang].name}
                  </h3>
                  <p className="font-[family-name:var(--font-open-sans)] text-white/80 text-sm sm:text-base md:text-lg font-light">
                    {founder[lang].title}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="font-[family-name:var(--font-open-sans)] text-white/90 leading-[1.51] text-sm sm:text-base md:text-lg font-light">
                {founder[lang].bio}
              </p>

              {/* Experience Badge */}
              <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <span className="font-[family-name:var(--font-open-sans)] text-white/90 font-normal text-sm sm:text-base">
                    {founder.id === 1
                      ? isHebrew
                        ? "33+ שנות ניסיון"
                        : "33+ Years Experience"
                      : isHebrew
                      ? "44+ שנות ניסיון"
                      : "44+ Years Experience"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}