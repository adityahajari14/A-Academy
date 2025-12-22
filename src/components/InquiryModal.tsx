"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";

// Types
interface FormData {
    fullName: string;
    email: string;
    phone: string;
    preferredDate: string;
    preferredTime: string;
    message: string;
}

interface InquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    language: "en" | "he";
}

interface ContentType {
    leftTitle: string;
    leftDescription: string;
    formTitle: string;
    fields: {
        fullName: string;
        email: string;
        phone: string;
        preferredDate: string;
        preferredTime: string;
        message: string;
    };
    placeholders: {
        fullName: string;
        email: string;
        phone: string;
        preferredDate: string;
        preferredTime: string;
        message: string;
    };
    submit: string;
}

// Constants
const INITIAL_FORM_STATE: FormData = {
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
};

export default function InquiryModal({ isOpen, onClose, language }: InquiryModalProps) {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isHebrew = language === "he";

    // Content configuration
    const content: Record<"en" | "he", ContentType> = {
        en: {
            leftTitle: "Schedule your Free Consultation",
            leftDescription:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            formTitle: "Enquiry Form",
            fields: {
                fullName: "Full name",
                email: "Email Address",
                phone: "Phone Number",
                preferredDate: "Preferred Date",
                preferredTime: "Time",
                message: "Message",
            },
            placeholders: {
                fullName: "Enter Full Name",
                email: "Enter Email Id",
                phone: "Phone Number",
                preferredDate: "DD/MM/YYYY",
                preferredTime: "HH:MM",
                message: "Enter Message",
            },
            submit: "Submit",
        },
        he: {
            leftTitle: "קבע את הייעוץ החינמי שלך",
            leftDescription:
                "לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית, סד דו איוסמוד טמפור אינסידידונט אוט לבורה את דולורה מגנה אליקווה.",
            formTitle: "טופס בירור",
            fields: {
                fullName: "שם מלא",
                email: "כתובת אימייל",
                phone: "מספר טלפון",
                preferredDate: "תאריך מועדף",
                preferredTime: "זמן",
                message: "הודעה",
            },
            placeholders: {
                fullName: "הזן שם מלא",
                email: "הזן מזהה אימייל",
                phone: "מספר טלפון",
                preferredDate: "יום/חודש/שנה",
                preferredTime: "שעה:דקה",
                message: "הזן הודעה",
            },
            submit: "שלח",
        },
    };

    const currentContent = content[language];

    // Event handlers
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // TODO: Implement actual form submission logic
            console.log("Form submitted:", formData);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Reset form and close modal on success
            setFormData(INITIAL_FORM_STATE);
            onClose();
        } catch (error) {
            console.error("Form submission error:", error);
            // TODO: Show error message to user
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = (): void => {
        if (!isSubmitting) {
            setFormData(INITIAL_FORM_STATE);
            onClose();
        }
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

                {/* Right Side - Form */}
                <div className="flex-1 flex flex-col px-4 sm:px-6 md:px-12 py-6 sm:py-8 relative bg-white min-w-0 md:min-w-[593px] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10">
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
                            disabled={isSubmitting}
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

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 md:gap-6 flex-1" noValidate>
                        <div className="flex flex-col gap-4 sm:gap-5">
                            {/* Full Name */}
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <label
                                    htmlFor="fullName"
                                    className="font-[family-name:var(--font-open-sans)] font-normal text-[#6b6b6b] text-xs sm:text-sm leading-[1.51]"
                                >
                                    {currentContent.fields.fullName}
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder={currentContent.placeholders.fullName}
                                    className="bg-white border border-[#e0e0e0] h-11 sm:h-12 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 font-[family-name:var(--font-open-sans)] font-normal text-sm text-black placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#008a01] transition-colors rounded-sm"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Email Address */}
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <label
                                    htmlFor="email"
                                    className="font-[family-name:var(--font-open-sans)] font-normal text-[#6b6b6b] text-xs sm:text-sm leading-[1.51]"
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
                                    className="bg-white border border-[#e0e0e0] h-11 sm:h-12 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 font-[family-name:var(--font-open-sans)] font-normal text-sm text-black placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#008a01] transition-colors rounded-sm"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Phone Number */}
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <label
                                    htmlFor="phone"
                                    className="font-[family-name:var(--font-open-sans)] font-normal text-[#6b6b6b] text-xs sm:text-sm leading-[1.51]"
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
                                    className="bg-white border border-[#e0e0e0] h-11 sm:h-12 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 font-[family-name:var(--font-open-sans)] font-normal text-sm text-black placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#008a01] transition-colors rounded-sm"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Preferred Date and Time Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                {/* Preferred Date */}
                                <div className="flex flex-col gap-1.5 sm:gap-2">
                                    <label
                                        htmlFor="preferredDate"
                                        className="font-[family-name:var(--font-open-sans)] font-normal text-[#6b6b6b] text-xs sm:text-sm leading-[1.51]"
                                    >
                                        {currentContent.fields.preferredDate}
                                    </label>
                                    <input
                                        type="date"
                                        id="preferredDate"
                                        name="preferredDate"
                                        value={formData.preferredDate}
                                        onChange={handleChange}
                                        className="bg-white border border-[#e0e0e0] h-11 sm:h-12 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 font-[family-name:var(--font-open-sans)] font-normal text-sm text-black placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#008a01] transition-colors rounded-sm"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                {/* Time */}
                                <div className="flex flex-col gap-1.5 sm:gap-2">
                                    <label
                                        htmlFor="preferredTime"
                                        className="font-[family-name:var(--font-open-sans)] font-normal text-[#6b6b6b] text-xs sm:text-sm leading-[1.51]"
                                    >
                                        {currentContent.fields.preferredTime}
                                    </label>
                                    <input
                                        type="time"
                                        id="preferredTime"
                                        name="preferredTime"
                                        value={formData.preferredTime}
                                        onChange={handleChange}
                                        className="bg-white border border-[#e0e0e0] h-11 sm:h-12 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 font-[family-name:var(--font-open-sans)] font-normal text-sm text-black placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#008a01] transition-colors rounded-sm"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <label
                                    htmlFor="message"
                                    className="font-[family-name:var(--font-open-sans)] font-normal text-[#6b6b6b] text-xs sm:text-sm leading-[1.51]"
                                >
                                    {currentContent.fields.message}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={currentContent.placeholders.message}
                                    rows={4}
                                    className="bg-white border border-[#e0e0e0] px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 font-[family-name:var(--font-open-sans)] font-normal text-sm text-black placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#008a01] transition-colors resize-none min-h-[80px] sm:min-h-[100px] rounded-sm"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-[#008a01] hover:bg-[#00700F] text-white font-[family-name:var(--font-montserrat)] font-semibold text-sm sm:text-base md:text-lg lg:text-[18px] h-11 sm:h-12 w-full md:w-[187px] px-5 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transform hover:scale-105 mt-2 rounded-sm"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : currentContent.submit}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
