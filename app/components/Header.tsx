"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface HeaderProps {
  onLanguageChange: (language: string) => void;
  selectedLanguage: string;
}

export default function Header({
  onLanguageChange,
  selectedLanguage,
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [headerLoaded, setHeaderLoaded] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "he", name: "Hebrew" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setHeaderLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (language: string) => {
    onLanguageChange(language);
    setIsDropdownOpen(false);
  };

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 bg-white shadow-sm transition-all duration-500 ${
        headerLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="w-full px-12 py-2 flex items-center justify-between">
        {/* Logo */}
        <div
          className={`flex items-center transition-all duration-500 ${
            headerLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          <Image
            src="/Logo.svg"
            alt="A+ Academy Logo"
            width={60}
            height={30}
            className="cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-12">
          {/* About Us */}
          <a
            href="#about"
            className={`font-[family-name:var(--font-poppins)] text-gray-800 text-sm font-[500] link-underline transition-all duration-500 ${
              headerLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            About Us
          </a>

          {/* Contact Us */}
          <a
            href="#contact"
            className={`font-[family-name:var(--font-poppins)] text-gray-800 text-sm font-[500] link-underline transition-all duration-500 ${
              headerLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            Contact Us
          </a>

          {/* Language Selector */}
          <div
            className={`relative transition-all duration-500 ${
              headerLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="font-[family-name:var(--font-poppins)] text-gray-800 text-base font-[500] hover:text-[#00B140] transition-all duration-200 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:border-[#008A01] hover:shadow-md"
            >
              {selectedLanguage}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden animate-dropdown">
                {languages.map((language, index) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.name)}
                    className={`w-full text-left px-4 py-3 font-[family-name:var(--font-poppins)] text-sm transition-all duration-200 ${
                      selectedLanguage === language.name
                        ? "bg-[#00B140] text-white"
                        : "text-gray-800 hover:bg-gray-100 hover:pl-6"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
