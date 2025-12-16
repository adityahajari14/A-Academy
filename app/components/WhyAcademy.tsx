"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

interface WhyAcademyProps {
  language: string;
}

export default function WhyAcademy({ language }: WhyAcademyProps) {
  const [boxVisible, setBoxVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      title: "Why Next Step Academy",
      cards: [
        {
          icon: "/Icons/Exam.svg",
          title: "Exam Preparation",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation u",
        },
        {
          icon: "/Icons/ChalkboardTeacher.svg",
          title: "E- Learning",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation u",
        },
        {
          icon: "/Icons/User.svg",
          title: "Mentorship",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation u",
        },
      ],
    },
    he: {
      title: "למה אקדמיית הצעד הבא",
      cards: [
        {
          icon: "/Icons/Exam.svg",
          title: "הכנה לבחינה",
          description:
            "לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אליט, סד דו איוסמוד טמפור אינסידידונט וט לבורה וט דולורה מגנה אליקא. וט אניים אד מיניים וניאם, קויס נוסטרוד אקסרסיטטיון ו",
        },
        {
          icon: "/Icons/ChalkboardTeacher.svg",
          title: "למידה אלקטרונית",
          description:
            "לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אליט, סד דו איוסמוד טמפור אינסידידונט וט לבורה וט דולורה מגנה אליקא. וט אניים אד מיניים וניאם, קויס נוסטרוד אקסרסיטטיון ו",
        },
        {
          icon: "/Icons/User.svg",
          title: "הדרכה",
          description:
            "לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אליט, סד דו איוסמוד טמפור אינסידידונט וט לבורה וט דולורה מגנה אליקא. וט אניים אד מיניים וניאם, קויס נוסטרוד אקסרסיטטיון ו",
        },
      ],
    },
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBoxVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-white py-20 px-6">
      <div
        ref={containerRef}
        className={`max-w-7xl mx-auto p-10 rounded-2xl transition-all duration-[1500ms] transform ${
          boxVisible ? "bg-white translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        {/* Title */}
        <h2 className="font-[family-name:var(--font-montserrat)] text-4xl md:text-5xl font-semibold text-center mb-10 text-gray-900">
          {currentContent.title}
        </h2>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentContent.cards.map((card, index) => (
            <div key={index}>
              <div className={`p-6 rounded-2xl bg-white border border-gray-200`}>
                {/* Icon on top */}
                <div className="flex justify-start mb-4">
                  <Image src={card.icon} alt={card.title} width={60} height={60} />
                </div>
                {/* Text Content */}
                <div className="">
                  <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-bold mb-2 text-left text-gray-900">
                    {card.title}
                  </h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-base leading-relaxed text-left text-gray-700">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
