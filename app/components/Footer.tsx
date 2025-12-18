"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface FooterProps {
  language: string;
}

export default function Footer({ language }: FooterProps) {
  const isHebrew = language === "he";
  const [visible, setVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    const el = footerRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const content = {
    en: {
      academyName: "Next Step Academy",
      tagline: "Where progress begins.",
      cta: "Drop a line",
      contact: "Contact",
      address: "Ma'alot-tarshiha, Rehov HaKnesiyot 10",
      followUs: "Follow Us",
      copyright: "© 2025 — A+ Academy. All rights reserved.",
    },
    he: {
      academyName: "אקדמיית הצעד הבא",
      tagline: "איפה ההתקדמות מתחילה.",
      cta: "צור קשר",
      contact: "יצירת קשר",
      address: "מעלות-תרשיחא, רחוב הכנסיות 10",
      followUs: "עקבו אחרינו",
      copyright: "© 2025 — A+ Academy. כל הזכויות שמורות.",
    },
  };

  const currentContent =
    content[language as keyof typeof content] || content.en;

  return (
    <footer
      ref={footerRef}
      className="bg-white w-full relative overflow-hidden"
      dir={isHebrew ? "rtl" : "ltr"}
    >
      {/* Decorative gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-1  opacity-30" />

      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row">
        {/* Left Section - Logo & Button */}
        <div
          className={`px-6 md:px-32 py-8 md:py-12 md:w-1/2 flex flex-col items-start gap-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          <div className="flex flex-col">
            <Image
              src="/Logo.svg"
              alt="A+ Academy"
              width={140}
              height={140}
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Main Headlines Stacked */}
          <div className="flex flex-col gap-1">
            <h2 className="font-[family-name:var(--font-inter)] text-xl md:text-2xl font-[500] text-black leading-tight">
              {currentContent.academyName}
            </h2>
            <h3 className="font-[family-name:var(--font-inter)] text-xl md:text-2xl font-[500] text-black leading-tight">
              {currentContent.tagline}
            </h3>
          </div>

          {/* CTA Button */}
          <Link
            href="#contact"
            className="font-[family-name:var(--font-inter)] bg-[#008A01] hover:bg-[#00800F] text-white text-base font-[500] px-8 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 btn-shine"
          >
            {currentContent.cta}
          </Link>
        </div>

        {/* Right Section - Contact & Social with Border */}
        <div
          className={`md:w-1/2 border-t-2 border-[#008A01] ${
            isHebrew
              ? "border-r-2 rounded-tr-[4rem] pr-8 md:pr-16 pl-6 md:pl-12"
              : "border-l-2 rounded-tl-[4rem] pl-8 md:pl-16 pr-6 md:pr-12"
          } pt-8 md:pt-12 py-8 md:py-12 flex flex-col gap-20 justify-between transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="flex flex-col md:flex-row justify-start gap-20 md:gap-40">
            {/* Contact Section */}
            <div
              className={`flex flex-col gap-3 transition-all duration-500 ${
                visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
              style={{ transitionDelay: "0.3s" }}
            >
              <p className="font-[family-name:var(--font-inter)] text-xs font-bold text-[#CF7A47] uppercase tracking-wider">
                {currentContent.contact}
              </p>
              <div className="font-[family-name:var(--font-inter)] text-sm md:text-base text-black space-y-1">
                <p className="hover:text-[#008A01] transition-colors duration-300 cursor-pointer">
                  0526653443
                </p>
                <p className="hover:text-[#008A01] transition-colors duration-300 cursor-pointer">
                  aplusacademy2525@gmail.com
                </p>
                <p>{currentContent.address}</p>
              </div>
            </div>

            {/* Social Media Section */}
            <div
              className={`flex flex-col gap-4 transition-all duration-500 ${
                visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              <p className="font-[family-name:var(--font-inter)] text-xs font-bold text-[#CF7A47] uppercase tracking-wider">
                {currentContent.followUs}
              </p>
              <div className="flex gap-3">
                <Link
                  href="https://instagram.com/A.plus.academy25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 border border-[rgba(207,122,71,0.4)] rounded-full hover:scale-110 hover:border-[#008A01] hover:bg-[#008A01]/5 transition-all duration-300"
                >
                  <Image
                    src="/icons/instagramblank.svg"
                    alt="Instagram"
                    width={20}
                    height={20}
                  />
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center w-12 h-12 border border-[rgba(207,122,71,0.4)] rounded-full hover:scale-110 hover:border-[#008A01] hover:bg-[#008A01]/5 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright */}
          <div
            className={`transition-all duration-500 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "0.5s" }}
          >
            <p className="font-[family-name:var(--font-inter)] text-xs text-gray-400">
              {currentContent.copyright}
            </p>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-[#008A01] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        aria-label="Back to top"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
}
