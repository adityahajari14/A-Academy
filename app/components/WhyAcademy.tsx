"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

interface WhyAcademyProps {
  language: string;
}

export default function WhyAcademy({ language }: WhyAcademyProps) {
  const [boxVisible, setBoxVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      title: "Why A+ Step Academy",
      cards: [
        {
          icon: "/Icons/Exam.svg",
          title: "Exam Preparation",
          description:
            "Preparation for middle school students transitioning to high school, including placement exams",
        },
        {
          icon: "/Icons/ChalkboardTeacher.svg",
          title: "E-Learning",
          description:
            "Private tutoring and small group classes, Online (virtual) lessons and in-class sessions",
        },
        {
          icon: "/Icons/User.svg",
          title: "Mentorship",
          description:
            "Personalized academic mentorship focused on building confidence, discipline, and independent thinking",
        },
      ],
    },
    he: {
      title: "למה אקדמיית A+",
      cards: [
        {
          icon: "/Icons/Exam.svg",
          title: "הכנה לבחינות",
          description: "הכנה לתלמידי חטיבת ביניים במעבר לתיכון, כולל מבחני מיון",
        },
        {
          icon: "/Icons/ChalkboardTeacher.svg",
          title: "למידה מקוונת",
          description:
            "שיעורים פרטיים ושיעורים בקבוצות קטנות, שיעורים מקוונים (וירטואליים) ושיעורים פרונטליים",
        },
        {
          icon: "/Icons/User.svg",
          title: "חונכות",
          description:
            "חונכות אקדמית מותאמת אישית המתמקדת בבניית ביטחון עצמי, משמעת וחשיבה עצמאית",
        },
      ],
    },
  };

  const currentContent =
    content[language as keyof typeof content] || content.en;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBoxVisible(true);
            // Delay cards animation for stagger effect
            setTimeout(() => setCardsVisible(true), 400);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    const wrapper = containerRef.current;
    if (wrapper) observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-white py-20 px-2 sm:px-4">
      <div
        ref={containerRef}
        className="max-w-screen-2xl w-full mx-auto overflow-hidden rounded-2xl"
      >
        <div
          className={`p-10 bg-white transform transition-all duration-1000 ${
            boxVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-16 opacity-0"
          }`}
        >
          {/* Title */}
          <h2
            className={`font-[family-name:var(--font-montserrat)] text-4xl md:text-5xl font-semibold text-center mb-10 text-gray-900 transition-all duration-700 ${
              boxVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {currentContent.title}
          </h2>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {currentContent.cards.map((card, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  cardsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`px-12 py-10 rounded-2xl bg-white border border-gray-300 h-full card-hover group cursor-pointer`}
                >
                  {/* Icon on top */}
                  <div className="flex justify-start mb-6">
                    <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        width={80}
                        height={80}
                      />
                    </div>
                  </div>
                  {/* Text Content */}
                  <div>
                    <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-bold mb-2 text-left text-gray-900 group-hover:text-[#008A01] transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="font-[family-name:var(--font-montserrat)] text-sm leading-relaxed text-left text-gray-700">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
