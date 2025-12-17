"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setFocusedIndex((prev) => (prev + 1) % foundersData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextIndex = (focusedIndex + 1) % foundersData.length;
  const focusedFounder = foundersData[focusedIndex];
  const nextFounder = foundersData[nextIndex];

  const lang = language as "en" | "he";

  const copy = {
    en: {
      title: "Founders",
      subtitle: "Our academy specializes in teaching mathematics and core academic subjects, offering private and group lessons tailored to each student's level and personal needs. Through personal attention, patience, and professional mentoring, we help students build confidence, achieve deep understanding, and gain practical tools for success.",
      greeting: "Hi, I'm",
      workAs: "I work as",
    },
    he: {
      title: "מייסדות",
      subtitle: "האקדמיה שלנו מתמחה בהוראת מתמטיקה ומקצועות לימוד מרכזיים, ומעניקה שיעורים פרטיים וקבוצתיים המותאמים לכל תלמיד לפי רמתו וצרכיו האישיים. באמצעות יחס אישי, סבלנות והכוונה מקצועית, אנו עוזרים לתלמידים לפתח ביטחון בלמידה, להבין לעומק את החומר ולרכוש כלים אמיתיים להצלחה.",
      greeting: "שלום, אני",
      workAs: "אני עובד/ת בתור",
    },
  } as const;

  const t = copy[lang];

  return (
    <section style={{ width: "100%", backgroundColor: "white", padding: "64px 80px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "48px", fontWeight: "bold", color: "#111827", marginBottom: "32px" }}>
          {t.title}
        </h2>

        <p style={{ color: "#374151", fontSize: "18px", lineHeight: "1.75", marginBottom: "64px", maxWidth: "900px" }}>
          {t.subtitle}
        </p>

        {/* Cards Container */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          
          {/* Focused Card */}
          <div
            key={focusedIndex}
            style={{
              width: "700px",
              height: "420px",
              backgroundColor: "#008A01",
              borderRadius: "24px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ position: "relative", width: "280px", height: "420px", flexShrink: 0 }}>
              <Image src={focusedFounder.image} alt={focusedFounder[lang].name} fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, color: "white" }}>
              <div>
                <h3 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "4px" }}>
                  {t.greeting} {focusedFounder[lang].name}
                </h3>
                <p style={{ fontSize: "20px", marginBottom: "16px" }}>
                  {t.workAs} {focusedFounder[lang].title}
                </p>
                <p style={{ fontSize: "14px", lineHeight: "1.6", opacity: 0.95 }}>
                  {focusedFounder[lang].bio}
                </p>
              </div>
              <div style={{ marginTop: "16px" }}>
                <Image src="/Icons/linkedinfull.svg" alt="LinkedIn" width={80} height={24} />
              </div>
            </div>
          </div>

          {/* Blurred Card */}
          <div
            style={{
              width: "240px",
              height: "300px",
              backgroundColor: "#008A01",
              borderRadius: "16px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              opacity: 0.5,
              filter: "blur(6px)",
            }}
          >
            <div style={{ position: "relative", width: "100px", height: "300px", flexShrink: 0 }}>
              <Image src={nextFounder.image} alt={nextFounder[lang].name} fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ padding: "12px", display: "flex", flexDirection: "column", justifyContent: "flex-start", flex: 1, color: "white", overflow: "hidden" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "4px" }}>
                {t.greeting} {nextFounder[lang].name}
              </h3>
              <p style={{ fontSize: "12px", marginBottom: "8px" }}>
                {t.workAs} {nextFounder[lang].title}
              </p>
              <p style={{ fontSize: "9px", lineHeight: "1.4", opacity: 0.95 }}>
                {nextFounder[lang].bio.substring(0, 120)}...
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
