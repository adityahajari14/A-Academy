"use client";

import { useState, useEffect, useRef } from "react";

interface ContactFormProps {
    language: "en" | "he";
}

export default function ContactForm({ language }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        query: "",
    });
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
            title: "Get in Touch",
            fields: {
                name: "Name",
                email: "Email",
                phone: "Phone Number",
                query: "Query",
            },
            placeholders: {
                name: "Enter Name",
                email: "Enter Email",
                phone: "Enter Phone Number",
                query: "Enter Query",
            },
            button: "Send my message",
        },
        he: {
            title: "צור קשר",
            fields: {
                name: "שם",
                email: "אימייל",
                phone: "מספר טלפון",
                query: "שאלה",
            },
            placeholders: {
                name: "הזן שם",
                email: "הזן אימייל",
                phone: "הזן מספר טלפון",
                query: "הזן שאלה",
            },
            button: "שלח הודעה",
        },
    };

    const currentContent = content[language];
    const isHebrew = language === "he";

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);
    };

    return (
        <section
            ref={sectionRef}
            className="bg-white flex flex-col gap-4 sm:gap-5 md:gap-6 items-start px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-12 md:py-14 lg:py-16 w-full"
            dir={isHebrew ? "rtl" : "ltr"}
        >
            {/* Title */}
            <div className="w-full max-w-7xl mx-auto">
                <h2 className={`font-[family-name:var(--font-open-sans)] font-normal text-2xl sm:text-3xl md:text-[32px] lg:text-[36px] text-black transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}>
                    {currentContent.title}
                </h2>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className={`flex flex-col gap-4 sm:gap-5 md:gap-6 w-full max-w-7xl mx-auto transition-all duration-700 delay-200 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
                {/* Form Fields */}
                <div className="flex flex-col gap-3 sm:gap-4 w-full">
                    {/* Name and Email Row */}
                    <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-8 lg:gap-12 w-full">
                        {/* Name Field */}
                        <div className="flex flex-col gap-1.5 sm:gap-2 flex-1">
                            <label
                                htmlFor="name"
                                className="font-[family-name:var(--font-poppins)] font-medium text-[#353535] text-xs sm:text-sm tracking-wide"
                            >
                                {currentContent.fields.name}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={currentContent.placeholders.name}
                                className="bg-[#fcfcfc] border border-[#cbcbcb] rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-sm text-[#353535] placeholder:text-[#9d9d9d] focus:outline-none focus:border-[#008a01] transition-colors"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col gap-1.5 sm:gap-2 flex-1">
                            <label
                                htmlFor="email"
                                className="font-[family-name:var(--font-poppins)] font-medium text-[#353535] text-xs sm:text-sm tracking-wide"
                            >
                                {currentContent.fields.email}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={currentContent.placeholders.email}
                                className="bg-[#fcfcfc] border border-[#cbcbcb] rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-sm text-[#353535] placeholder:text-[#9d9d9d] focus:outline-none focus:border-[#008a01] transition-colors"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone Number Field */}
                    <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
                        <label
                            htmlFor="phone"
                            className="font-[family-name:var(--font-poppins)] font-medium text-[#353535] text-xs sm:text-sm tracking-wide"
                        >
                            {currentContent.fields.phone}
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={currentContent.placeholders.phone}
                            className="bg-[#fcfcfc] border border-[#cbcbcb] rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-sm text-[#353535] placeholder:text-[#9d9d9d] focus:outline-none focus:border-[#008a01] transition-colors"
                            required
                        />
                    </div>

                    {/* Query Field */}
                    <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
                        <label
                            htmlFor="query"
                            className="font-[family-name:var(--font-poppins)] font-medium text-[#353535] text-xs sm:text-sm tracking-wide"
                        >
                            {currentContent.fields.query}
                        </label>
                        <textarea
                            id="query"
                            name="query"
                            value={formData.query}
                            onChange={handleChange}
                            placeholder={currentContent.placeholders.query}
                            rows={5}
                            className="bg-[#fcfcfc] border border-[#cbcbcb] rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-sm text-[#353535] placeholder:text-[#9d9d9d] focus:outline-none focus:border-[#008a01] transition-colors resize-none"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-[#008a01] hover:bg-[#00700F] text-white font-[family-name:var(--font-poppins)] font-normal text-sm sm:text-base tracking-wide px-5 sm:px-6 py-3 sm:py-3.5 md:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 self-start"
                >
                    {currentContent.button}
                </button>
            </form>
        </section>
    );
}
