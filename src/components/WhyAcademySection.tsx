"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface WhyAcademySectionProps {
    language: "en" | "he";
}

// Counter hook for animated numbers
function useCounter(end: string | number, duration: number = 2000, suffix: string = "") {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        const endString = typeof end === 'string' ? end : end.toString();
        const numericValue = parseInt(endString.replace(/\D/g, ""));
        const start = 0;
        const increment = numericValue / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                setCount(numericValue);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [hasStarted, end, duration]);

    // Format the number with suffix
    const formatValue = () => {
        const endString = typeof end === 'string' ? end : end.toString();
        if (endString.includes("+")) {
            return `${count}+`;
        }
        if (endString.includes("%")) {
            return `${count}%`;
        }
        return count.toString();
    };

    return { count: formatValue(), ref };
}

export default function WhyAcademySection({ language }: WhyAcademySectionProps) {
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
            title: "Why A+ Academy?",
            description:
                "With over 77 years of combined teaching experience, A+ Academy has helped more than 1000 students achieve their academic goals. Our proven track record of 98% success rate speaks to our commitment to excellence. We combine expertise, personalized attention, and innovative teaching methods to ensure every student reaches their full potential in mathematics.",
            stats: [
                { value: "77+", label: "Years of Experience" },
                { value: "98%", label: "Success Rate" },
                { value: "1000+", label: "Students" },
            ],
            features: [
                {
                    text: "Preparation for middle school students transitioning to high school, including placement exams",
                },
                {
                    text: "High school preparation | 3–4–5 study units",
                },
                {
                    text: "Private tutoring and small group classes",
                },
                {
                    text: "Online (virtual) lessons and in-class sessions",
                },
                {
                    text: "Personalized academic mentorship focused on building confidence, discipline, and independent thinking",
                }
            ]
        },
        he: {
            title: "למה אקדמיית A+?",
            description:
                "עם יותר מ-77 שנות ניסיון משולבות בהוראה, אקדמיית A+ עזרה ליותר מ-1000 תלמידים להשיג את המטרות האקדמיות שלהם. שיעור ההצלחה המוכח שלנו של 98% מעיד על המחויבות שלנו למצוינות. אנו משלבים מומחיות, תשומת לב אישית ושיטות הוראה חדשניות כדי להבטיח שכל תלמיד יגיע לפוטנציאל המלא שלו במתמטיקה.",
            stats: [
                { value: "77+", label: "שנות ניסיון" },
                { value: "98%", label: "אחוז הצלחה" },
                { value: "1000+", label: "תלמידים" },
            ],
            features: [
                {
                    text: "הכנה לתלמידי חטיבת ביניים המעברים לתיכון, כולל בחינות מיון",
                },
                {
                    text: "הכנה לבגרות | 3–4–5 יחידות לימוד",
                },
                {
                    text: "שיעורים פרטיים ושיעורים בקבוצות קטנות",
                },
                {
                    text: "שיעורים מקוונים (וירטואליים) ומפגשים בכיתה",
                },
                {
                    text: "חונכות אקדמית מותאמת אישית המתמקדת בבניית ביטחון, משמעת וחשיבה עצמאית",
                }
            ]
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
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start w-full max-w-7xl mx-auto">
                {/* Left Column - Text Content */}
                <div className="flex flex-col gap-6 sm:gap-7 md:gap-8 w-full lg:w-[614px] shrink-0">
                {/* Title and Description */}
                <div className={`flex flex-col gap-4 sm:gap-5 md:gap-6 text-black transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}>
                    <h2 className="font-[family-name:var(--font-open-sans)] font-normal text-2xl sm:text-3xl md:text-[38px] lg:text-[42px] leading-[1.33]">
                        {currentContent.title}
                    </h2>
                    <p className="font-[family-name:var(--font-open-sans)] font-light text-sm sm:text-base md:text-lg lg:text-xl leading-[1.51]">
                        {currentContent.description}
                    </p>
                </div>

                {/* Statistics */}
                <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 lg:gap-[69px] px-2 sm:px-3 md:px-4 py-3 sm:py-4 md:py-5">
                    {currentContent.stats.map((stat, index) => {
                        const StatCounter = () => {
                            const { count, ref } = useCounter(stat.value, 2000);
                            return (
                                <div
                                    ref={ref}
                                    className="flex flex-col items-start leading-[1.51] w-auto sm:w-28 md:w-32 lg:w-[137px] shrink-0"
                                >
                                    <p className="font-[family-name:var(--font-open-sans)] font-normal text-[#080808] text-xs sm:text-sm opacity-0 animate-fade-in-up"
                                       style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}>
                                        {stat.label}
                                    </p>
                                    <p className="font-[family-name:var(--font-open-sans)] font-semibold text-[#008a01] text-3xl sm:text-4xl md:text-5xl lg:text-[48px] tabular-nums">
                                        <span className="inline-block animate-counter-up">{count}</span>
                                    </p>
                                </div>
                            );
                        };
                        return <StatCounter key={index} />;
                    })}
                </div>
            </div>

                {/* Right Column - Features */}
                <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 w-full">
                    {/* Feature Cards */}
                    {currentContent.features.map((feature, index) => (
                        <div
                            key={index}
                            className={`bg-[rgba(0,138,1,0.05)] flex flex-col px-4 sm:px-5 md:px-6 lg:px-8 py-5 sm:py-6 md:py-7 lg:py-9 rounded-xl sm:rounded-2xl transition-all duration-500 hover:shadow-lg hover:bg-[rgba(0,138,1,0.08)] ${
                                isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-8"
                            }`}
                            style={{
                                transitionDelay: `${(index + 1) * 100}ms`,
                            }}
                        >
                            <p className="font-[family-name:var(--font-open-sans)] font-normal text-[#001d00] text-sm sm:text-base md:text-lg lg:text-xl leading-[1.51]">
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
