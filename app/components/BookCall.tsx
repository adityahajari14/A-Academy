"use client";

import { useEffect, useRef, useState } from "react";

interface BookCallProps {
  language?: "en" | "he";
}

export default function BookCall({ language = "en" }: BookCallProps) {
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

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

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      });
    }, 2000);
  };

  const copy = {
    en: {
      title: "Ready to Get Started?",
      subtitle: "Book a free consultation call with our academic advisors",
      cta: "Schedule a Call",
      formTitle: "Schedule Your Free Consultation",
      formSubtitle: "Fill out the form below and we'll get back to you within 24 hours",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your full name",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Enter your phone number",
      dateLabel: "Preferred Date",
      timeLabel: "Preferred Time",
      messageLabel: "Message (Optional)",
      messagePlaceholder: "Tell us about your learning goals...",
      submitBtn: "Submit Request",
      submittingBtn: "Submitting...",
      successTitle: "Request Submitted!",
      successMessage: "We'll contact you shortly to confirm your consultation.",
      closeBtn: "Close",
      morning: "Morning (9AM - 12PM)",
      afternoon: "Afternoon (12PM - 5PM)",
      evening: "Evening (5PM - 8PM)",
      noCommitment: "No commitment required • 30-minute session",
    },
    he: {
      title: "מוכנים להתחיל?",
      subtitle: "קבעו שיחת ייעוץ חינם עם היועצים האקדמיים שלנו",
      cta: "קביעת שיחה",
      formTitle: "קבעו את הייעוץ החינמי שלכם",
      formSubtitle: "מלאו את הטופס ונחזור אליכם תוך 24 שעות",
      nameLabel: "שם מלא",
      namePlaceholder: "הזינו את שמכם המלא",
      emailLabel: "כתובת אימייל",
      emailPlaceholder: "הזינו את האימייל שלכם",
      phoneLabel: "מספר טלפון",
      phonePlaceholder: "הזינו את מספר הטלפון שלכם",
      dateLabel: "תאריך מועדף",
      timeLabel: "שעה מועדפת",
      messageLabel: "הודעה (אופציונלי)",
      messagePlaceholder: "ספרו לנו על מטרות הלמידה שלכם...",
      submitBtn: "שליחת בקשה",
      submittingBtn: "שולח...",
      successTitle: "הבקשה נשלחה!",
      successMessage: "ניצור איתכם קשר בקרוב לאישור הייעוץ.",
      closeBtn: "סגירה",
      morning: "בוקר (9:00 - 12:00)",
      afternoon: "צהריים (12:00 - 17:00)",
      evening: "ערב (17:00 - 20:00)",
      noCommitment: "ללא התחייבות • שיחה של 30 דקות",
    },
  } as const;

  const t = copy[language];
  const isHebrew = language === "he";

  return (
    <>
      <section
        id="contact"
        className="w-full bg-gradient-to-b from-gray-50 to-white py-20 px-4 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#008A01]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#008A01]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div
          ref={containerRef}
          className={`max-w-screen-lg mx-auto text-center relative z-10 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Title */}
          <h2
            className={`font-[family-name:var(--font-montserrat)] text-4xl md:text-5xl font-semibold text-gray-900 mb-4 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.1s" }}
          >
            {t.title}
          </h2>

          {/* Subtitle */}
          <p
            className={`font-[family-name:var(--font-montserrat)] text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            {t.subtitle}
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className={`inline-block font-[family-name:var(--font-montserrat)] bg-[#008A01] hover:bg-[#00800F] text-white text-lg md:text-xl font-semibold px-12 py-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 btn-shine animate-pulse-glow ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            {t.cta}
          </button>

          {/* Optional: Small note */}
          <p
            className={`font-[family-name:var(--font-montserrat)] text-sm text-gray-500 mt-6 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            {t.noCommitment}
          </p>
        </div>
      </section>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          dir={isHebrew ? "rtl" : "ltr"}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 z-10"
              aria-label={t.closeBtn}
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-[#008A01] to-[#00B140] px-8 py-8 rounded-t-3xl">
              <h3 className="font-[family-name:var(--font-montserrat)] text-2xl md:text-3xl font-bold text-white mb-2">
                {t.formTitle}
              </h3>
              <p className="font-[family-name:var(--font-montserrat)] text-white/90 text-sm md:text-base">
                {t.formSubtitle}
              </p>
            </div>

            {/* Form */}
            <div className="p-8">
              {isSubmitted ? (
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-20 h-20 bg-[#008A01]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-[#008A01]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-gray-900 mb-2">
                    {t.successTitle}
                  </h4>
                  <p className="font-[family-name:var(--font-montserrat)] text-gray-600">
                    {t.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-700 mb-2">
                      {t.nameLabel} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t.namePlaceholder}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#008A01] focus:border-transparent transition-all duration-200 font-[family-name:var(--font-montserrat)] text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-700 mb-2">
                      {t.emailLabel} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t.emailPlaceholder}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#008A01] focus:border-transparent transition-all duration-200 font-[family-name:var(--font-montserrat)] text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-700 mb-2">
                      {t.phoneLabel} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t.phonePlaceholder}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#008A01] focus:border-transparent transition-all duration-200 font-[family-name:var(--font-montserrat)] text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* Date and Time Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Preferred Date */}
                    <div>
                      <label className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-700 mb-2">
                        {t.dateLabel} *
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#008A01] focus:border-transparent transition-all duration-200 font-[family-name:var(--font-montserrat)] text-gray-900"
                      />
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-700 mb-2">
                        {t.timeLabel} *
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#008A01] focus:border-transparent transition-all duration-200 font-[family-name:var(--font-montserrat)] text-gray-900 bg-white"
                      >
                        <option value="">--</option>
                        <option value="morning">{t.morning}</option>
                        <option value="afternoon">{t.afternoon}</option>
                        <option value="evening">{t.evening}</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-700 mb-2">
                      {t.messageLabel}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t.messagePlaceholder}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#008A01] focus:border-transparent transition-all duration-200 font-[family-name:var(--font-montserrat)] text-gray-900 placeholder-gray-400 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#008A01] hover:bg-[#00800F] disabled:bg-gray-400 text-white font-[family-name:var(--font-montserrat)] text-lg font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {t.submittingBtn}
                      </>
                    ) : (
                      t.submitBtn
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
