"use client";

import { useState, useEffect, useRef } from "react";

interface AboutAcademyProps {
    language: "en" | "he";
}

export default function AboutAcademy({ language }: AboutAcademyProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);
    const content = {
        en: {
            title: "About A+ Academy",
            text: (
                <>
                    <p className="mb-0">
                        A+ Academy was born out of a genuine love for mathematics and a deep understanding of the challenges students face on their path to success.
                    </p>
                    <p className="mb-0">The academy was founded by</p>
                    <p className="mb-0">
                        mathematics teachers Iman Tanous and Rodina Sussan, who bring many years of experience in teaching, mentoring students, and preparing them for high achievement — not only in grades, but also in confidence and mindset.
                    </p>
                    <p className="mb-0">&nbsp;</p>
                    <p className="mb-0">
                        We believe that mathematics should not be intimidating.
                    </p>
                    <p>
                        Through a personalized approach, clear explanations, patience, and individual attention for every student, we turn complex material into something simple, clear, and even enjoyable
                    </p>
                </>
            ),
        },
        he: {
            title: "אודות אקדמיית A+",
            text: (
                <>
                    <p className="mb-0">
                        אקדמיית +A נולדה מתוך אהבה אמיתית למתמטיקה ומתוך הבנה עמוקה של האתגרים שתלמידים חווים בדרך להצלחה.
                    </p>
                    <p className="mb-0">&nbsp;</p>
                    <p className="mb-0">
                        האקדמיה מבוססת על ידע מקצועי וניסיון הוראה רב, ומשקפת גישה אישית שמטרתה לחזק הבנה, ביטחון וחשיבה מתמטית — לא רק ציונים.
                    </p>
                    <p className="mb-0">
                        אנחנו מאמינים שמתמטיקה לא צריכה להיות מאיימת.
                    </p>
                    <p>
                        באמצעות יחס אישי, הסברים ברורים וליווי תומך, אנו עוזרים לכל תלמיד להתקדם בביטחון ולהאמין ביכולתו.
                    </p>
                </>
            ),
        },
    };

    const currentContent = content[language];
    const isHebrew = language === "he";

    return (
        <section
            ref={sectionRef}
            className="flex flex-col items-start px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-14 md:py-20 lg:py-24 w-full bg-white"
            dir={isHebrew ? "rtl" : "ltr"}
        >
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 items-start w-full max-w-7xl mx-auto">
                {/* Title */}
                <h2 className={`font-[family-name:var(--font-open-sans)] font-normal text-2xl sm:text-3xl md:text-[38px] lg:text-[42px] leading-[1.33] text-black w-full transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}>
                    {currentContent.title}
                </h2>

                {/* Content */}
                <div className={`font-[family-name:var(--font-open-sans)] font-light text-sm sm:text-base md:text-lg lg:text-xl leading-[1.51] text-black w-full transition-all duration-700 delay-200 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}>
                    {currentContent.text}
                </div>
            </div>
        </section>
    );
}
