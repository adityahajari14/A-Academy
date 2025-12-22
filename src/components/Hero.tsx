"use client";

import { useEffect, useState } from "react";
import InquiryModal from "./InquiryModal";

interface HeroProps {
    language: "en" | "he";
    onLanguageChange: (language: string) => void;
}

export default function Hero({ language, onLanguageChange }: HeroProps) {
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isHebrew = language === "he";

    const heroContent = {
        en: {
            title: "A+ Academy",
            tagline: '"Where progress begins."',
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
            cta: "Get Started",
        },
        he: {
            title: "אקדמיית A+",
            tagline: '"היכן מתחיל הקידמה."',
            description:
                "לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית, סד דו איוסמוד טמפור אינסידידונט",
            cta: "התחל עכשיו",
        },
    };

    const currentLang = isHebrew ? "he" : "en";

    // Trigger hero animations after mount
    useEffect(() => {
        const timer = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div
                className="relative z-10 flex flex-col items-start justify-end h-full px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-14 md:py-16 max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-[800px]"
                dir={isHebrew ? "rtl" : "ltr"}
            >
                {/* Title and Tagline */}
                <div
                    className={`mb-3 sm:mb-4 transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                    style={{ transitionDelay: "0.2s" }}
                >
                    <h1 className="font-[family-name:var(--font-open-sans)] text-white text-3xl sm:text-4xl md:text-5xl lg:text-[50px] leading-tight font-normal mb-1">
                        {heroContent[currentLang].title}
                    </h1>
                    <h2 className="font-[family-name:var(--font-open-sans)] text-white text-3xl sm:text-4xl md:text-5xl lg:text-[50px] leading-tight font-normal">
                        {heroContent[currentLang].tagline}
                    </h2>
                </div>

                {/* Description */}
                <p
                    className={`font-[family-name:var(--font-poppins)] text-white text-sm sm:text-base md:text-lg leading-normal mb-6 sm:mb-8 max-w-full sm:max-w-md md:max-w-lg lg:max-w-[600px] transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                    style={{ transitionDelay: "0.4s" }}
                >
                    {heroContent[currentLang].description}
                </p>

                {/* CTA Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className={`font-[family-name:var(--font-montserrat)] bg-[#008A01] hover:bg-[#00700F] text-white text-base sm:text-lg md:text-xl font-semibold px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                    style={{ transitionDelay: "0.6s" }}
                >
                    {heroContent[currentLang].cta}
                </button>
            </div>

            {/* Inquiry Modal */}
            <InquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                language={language}
            />
        </>
    );
}
