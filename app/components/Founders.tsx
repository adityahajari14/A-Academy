"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface FounderContent {
  name: string;
  title: string;
  bio: string;
}

interface Founder {
  id: number;
  en: FounderContent;
  he: FounderContent;
  image: string;
  linkedin: string;
}

const foundersData: Founder[] = [
  {
    id: 1,
    en: {
      name: "Iman Tanous",
      title: "Mathematics Expert",
      bio: "Holds a Bachelor's degree in Mathematics and Computer Science from the University of Haifa, with over 33 years of experience preparing students for Bagrut exams in mathematics. An expert in teaching the 3, 4, and 5-unit levels, Iman guides students toward success through a combination of professionalism, patience, and a deep understanding of each student's individual needs. She is widely recognized as a teacher who leads her students to excellence while creating a supportive and motivating learning environment.",
    },
    he: {
      name: "אימאן טנוס",
      title: "מומחית מתמטיקה",
      bio: "בעלת תואר ראשון במתמטיקה ומדעי המחשב מאוניברסיטת חיפה, עם ניסיון של מעל 33 שנה בהכנה לבגרויות במתמטיקה. מומחית בהוראת 3, 4 ו-5 יחידות לימוד, ומלווה תלמידים להצלחה תוך שילוב של מקצועיות, סבלנות והבנה עמוקה של צורכי כל תלמיד ותלמידה. שמה הולך לפניה כמורה שמובילה למצוינות תוך יצירת סביבה לימודית תומכת ומקדמת.",
    },
    image: "/Founder.png",
    linkedin: "https://linkedin.com/in/iman-tanous",
  },
  {
    id: 2,
    en: {
      name: "Rudina Sosan",
      title: "Mathematics Specialist",
      bio: "Holds a Bachelor's degree in Mathematics from the Hebrew University of Jerusalem, with 44 years of extensive experience teaching mathematics and preparing students for Bagrut exams in various schools. Specializing in the 3, 4, and 5-unit levels, Rudina brings an educational approach that blends deep knowledge, empathy, and a commitment to student success. Over the years, she has helped students achieve outstanding results, build confidence in learning, and develop a genuine love for mathematics.",
    },
    he: {
      name: "רודינה סוסאן",
      title: "מומחית מתמטיקה",
      bio: "בעלת תואר ראשון במתמטיקה מהאוניברסיטה העברית בירושלים, עם ניסיון עשיר של 44 שנים בהוראת מתמטיקה והכנה לבגרויות בבתי ספר שונים. מתמחה בהוראת 3, 4 ו-5 יחידות לימוד, ומביאה איתה גישה חינוכית שמחברת בין ידע עמוק, הכלה, והובלה להצלחה. לאורך השנים סייעה לתלמידים להגיע להישגים גבוהים, לבנות ביטחון עצמי בלמידה, ולפתח אהבה אמיתית למתמטיקה.",
    },
    image: "/Founder.png",
    linkedin: "https://linkedin.com/in/rudina-sosan",
  },
];

interface FoundersProps {
  language?: "en" | "he";
}

export default function Founders({ language = "en" }: FoundersProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setFocusedIndex((prev) => (prev + 1) % foundersData.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextIndex = (focusedIndex + 1) % foundersData.length;
  const focusedFounder = foundersData[focusedIndex];
  const nextFounder = foundersData[nextIndex];

  const lang = language as "en" | "he";

  const copy = {
    en: {
      title: "Founders",
      subtitle:
        "Our academy specializes in teaching mathematics and core academic subjects, offering private and group lessons tailored to each student's level and personal needs. Through personal attention, patience, and professional mentoring, we help students build confidence, achieve deep understanding, and gain practical tools for success.",
      greeting: "Hi, I'm",
      workAs: "I work as",
    },
    he: {
      title: "מייסדות",
      subtitle:
        "האקדמיה שלנו מתמחה בהוראת מתמטיקה ומקצועות לימוד מרכזיים, ומעניקה שיעורים פרטיים וקבוצתיים המותאמים לכל תלמיד לפי רמתו וצרכיו האישיים. באמצעות יחס אישי, סבלנות והכוונה מקצועית, אנו עוזרים לתלמידים לפתח ביטחון בלמידה, להבין לעומק את החומר ולרכוש כלים אמיתיים להצלחה.",
      greeting: "שלום, אני",
      workAs: "אני עובד/ת בתור",
    },
  } as const;

  const t = copy[lang];

  return (
    <section
      ref={containerRef}
      className="w-full bg-white py-16 px-6 md:px-20"
      dir={lang === "he" ? "rtl" : "ltr"}
    >
      <div
        className={`max-w-7xl mx-auto transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <h2
          className={`text-4xl md:text-5xl font-bold text-gray-900 mb-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          {t.title}
        </h2>

        <p
          className={`text-gray-600 text-lg leading-relaxed mb-16 max-w-4xl transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          {t.subtitle}
        </p>

        {/* Cards Container */}
        <div
          className={`flex flex-col lg:flex-row items-center justify-between gap-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.3s" }}
        >
          {/* Focused Card */}
          <div
            key={focusedIndex}
            className={`w-full lg:w-[700px] h-auto lg:h-[420px] bg-[#008A01] rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl transition-all duration-500 ${
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="relative w-full lg:w-[280px] h-[300px] lg:h-[420px] flex-shrink-0">
              <Image
                src={focusedFounder.image}
                alt={focusedFounder[lang].name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 lg:p-8 flex flex-col justify-between flex-1 text-white">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-1">
                  {t.greeting} {focusedFounder[lang].name}
                </h3>
                <p className="text-lg lg:text-xl mb-4 opacity-90">
                  {t.workAs} {focusedFounder[lang].title}
                </p>
                <p className="text-sm lg:text-base leading-relaxed opacity-95">
                  {focusedFounder[lang].bio}
                </p>
              </div>
              <div className="mt-4 lg:mt-6">
                <a
                  href={focusedFounder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:scale-110 transition-transform duration-300"
                >
                  <Image
                    src="/Icons/linkedinfull.svg"
                    alt="LinkedIn"
                    width={80}
                    height={24}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Blurred Card - Hidden on mobile */}
          <div
            className={`hidden lg:flex w-[240px] h-[300px] bg-[#008A01] rounded-2xl overflow-hidden flex-row shadow-xl transition-all duration-500 ${
              isTransitioning
                ? "opacity-0 translate-x-10"
                : "opacity-50 translate-x-0"
            }`}
            style={{ filter: "blur(6px)" }}
          >
            <div className="relative w-[100px] h-[300px] flex-shrink-0">
              <Image
                src={nextFounder.image}
                alt={nextFounder[lang].name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3 flex flex-col justify-start flex-1 text-white overflow-hidden">
              <h3 className="text-base font-bold mb-1">
                {t.greeting} {nextFounder[lang].name}
              </h3>
              <p className="text-xs mb-2">
                {t.workAs} {nextFounder[lang].title}
              </p>
              <p className="text-[9px] leading-relaxed opacity-95">
                {nextFounder[lang].bio.substring(0, 120)}...
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {foundersData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setFocusedIndex(index);
                  setIsTransitioning(false);
                }, 300);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === focusedIndex
                  ? "bg-[#008A01] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`View founder ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
