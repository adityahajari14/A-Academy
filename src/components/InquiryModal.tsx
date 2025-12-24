"use client";

import { useEffect } from "react";
import Image from "next/image";

interface InquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    language: "en" | "he";
}

interface ContentType {
    leftTitle: string;
    leftDescription: string;
    formTitle: string;
}

// Calendly URL - Replace with your actual Calendly scheduling link
const CALENDLY_URL = "https://calendly.com/aplusacademy86/30min?hide_gdpr_banner=1&primary_color=008a01";

export default function InquiryModal({ isOpen, onClose, language }: InquiryModalProps) {
    const isHebrew = language === "he";

    useEffect(() => {
        // Check if script already exists
        const existingScript = document.querySelector(
            'script[src="https://assets.calendly.com/assets/external/widget.js"]'
        );
        
        if (!existingScript) {
            // Load Calendly script
            const script = document.createElement("script");
            script.src = "https://assets.calendly.com/assets/external/widget.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            // Initialize Calendly widget when modal opens
            const initCalendly = () => {
                if (typeof window !== 'undefined' && window.Calendly) {
                    const calendlyContainer = document.getElementById("calendly-inline-widget");
                    if (calendlyContainer) {
                        // Clear any existing content
                        calendlyContainer.innerHTML = '';
                        window.Calendly.initInlineWidget({
                            url: CALENDLY_URL,
                            parentElement: calendlyContainer,
                        });
                    }
                } else {
                    // Retry if Calendly script hasn't loaded yet
                    setTimeout(initCalendly, 100);
                }
            };
            // Small delay to ensure DOM is ready
            const timer = setTimeout(initCalendly, 100);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Content configuration
    const content: Record<"en" | "he", ContentType> = {
        en: {
            leftTitle: "Schedule your Free Consultation",
            leftDescription:
                "Book a personalized consultation with our expert mathematics teachers. Choose a time that works best for you and let's discuss how we can help you achieve your academic goals.",
            formTitle: "Schedule a Meeting",
        },
        he: {
            leftTitle: "קבע את הייעוץ החינמי שלך",
            leftDescription:
                "קבע פגישת ייעוץ אישית עם מורות המתמטיקה המומחיות שלנו. בחר זמן שמתאים לך בואו נדון כיצד נוכל לעזור לך להשיג את המטרות האקדמיות שלך.",
            formTitle: "קבע פגישה",
        },
    };

    const currentContent = content[language];

    const handleClose = (): void => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                className="relative bg-white w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-[1200px] h-auto max-h-[95vh] sm:max-h-[90vh] flex flex-col md:flex-row overflow-hidden shadow-2xl rounded-lg sm:rounded-none"
                onClick={(e) => e.stopPropagation()}
                dir={isHebrew ? "rtl" : "ltr"}
            >
                {/* Left Side - Image with Text */}
                <div className="relative w-full md:w-[536px] min-h-[300px] sm:min-h-[400px] md:min-h-[726px] overflow-hidden flex-shrink-0 hidden md:block">
                    <div className="absolute inset-0">
                        <Image
                            src="/enquiry-img.webp"
                            alt="Consultation"
                            fill
                            className="object-cover"
                            style={{ objectPosition: "center" }}
                            priority
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    "linear-gradient(219.44deg, rgba(0, 0, 0, 0) 2.5547%, rgba(0, 0, 0, 0.9) 98.084%)",
                            }}
                        />
                    </div>

                    <div className="w-full max-w-[442px] flex flex-col gap-3 sm:gap-4 text-white absolute left-8 sm:left-12 md:left-[50px] bottom-16 sm:bottom-20 md:bottom-[150px] px-4 sm:px-0">
                        <h2 className="font-[family-name:var(--font-open-sans)] font-semibold text-xl sm:text-2xl md:text-3xl lg:text-[32px] leading-[1.51]">
                            {currentContent.leftTitle}
                        </h2>
                        <p className="font-[family-name:var(--font-open-sans)] font-normal text-sm sm:text-base leading-[1.51]">
                            {currentContent.leftDescription}
                        </p>
                    </div>
                </div>

                {/* Right Side - Calendly */}
                <div className="flex-1 flex flex-col px-4 sm:px-6 md:px-12 py-6 sm:py-8 relative bg-white min-w-0 md:min-w-[593px] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h3
                            id="modal-title"
                            className="font-[family-name:var(--font-open-sans)] font-semibold text-lg sm:text-xl md:text-2xl lg:text-[24px] text-black leading-[1.51]"
                        >
                            {currentContent.formTitle}
                        </h3>
                        <button
                            onClick={handleClose}
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                            aria-label="Close modal"
                        >
                            <svg
                                className="w-5 h-5 sm:w-6 sm:h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Calendly Widget */}
                    <div 
                        id="calendly-inline-widget" 
                        className="calendly-inline-widget w-full min-h-[600px] sm:min-h-[700px]"
                        style={{ minHeight: '600px' }}
                    />
                </div>
            </div>
        </div>
    );
}
