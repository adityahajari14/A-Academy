"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface HeaderProps {
  onLanguageChange: (language: string) => void;
  selectedLanguage: string;
}

interface Language {
  code: "en" | "he";
  name: string;
  nativeName: string;
  flag: string;
}

export default function Header({
  onLanguageChange,
  selectedLanguage,
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [headerLoaded, setHeaderLoaded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = [
    { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
    { code: "he", name: "Hebrew", nativeName: "עברית", flag: "🇮🇱" },
  ];

  const currentLanguage = languages.find(
    (lang) => lang.name === selectedLanguage
  ) || languages[0];

  useEffect(() => {
    const timer = setTimeout(() => setHeaderLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isDropdownOpen]);

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  const handleLanguageChange = (language: Language) => {
    onLanguageChange(language.name);
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, language: Language) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleLanguageChange(language);
    }
  };

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 bg-white shadow-sm transition-all duration-500 ${
        headerLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-2 flex items-center justify-between">
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
            width={120}
            height={60}
            className="cursor-pointer hover:scale-105 transition-transform duration-300 w-20 h-10 sm:w-24 sm:h-12 md:w-28 md:h-14 lg:w-[120px] lg:h-[60px]"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {/* About Us */}
          <a
            href="#about"
            className={`font-[family-name:var(--font-poppins)] text-gray-800 text-xs sm:text-sm font-medium link-underline transition-all duration-500 ${
              headerLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            About Us
          </a>

          {/* Contact Us */}
          <a
            href="#contact"
            className={`font-[family-name:var(--font-poppins)] text-gray-800 text-xs sm:text-sm font-medium link-underline transition-all duration-500 ${
              headerLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            Contact Us
          </a>

          {/* Language Selector */}
          <div
            ref={dropdownRef}
            className={`relative transition-all duration-500 ${
              headerLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsDropdownOpen(!isDropdownOpen);
                }
              }}
              aria-label="Select language"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              className="font-[family-name:var(--font-poppins)] text-gray-800 text-sm sm:text-base font-medium hover:text-[#00B140] transition-all duration-200 flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 border border-gray-300 rounded-lg hover:border-[#008A01] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#008A01] focus:ring-offset-2 bg-white"
            >
              {/* Globe Icon */}
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              
              {/* Language Display */}
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <span className="text-base">{currentLanguage.flag}</span>
                <span>{currentLanguage.code.toUpperCase()}</span>
              </span>
              <span className="sm:hidden text-xs font-semibold">
                {currentLanguage.code.toUpperCase()}
              </span>
              
              {/* Dropdown Arrow */}
              <svg
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 text-gray-500 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
              <div
                role="menu"
                aria-label="Language selection"
                className="absolute top-full right-0 mt-2 w-44 sm:w-48 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-dropdown z-50"
              >
                {languages.map((language, index) => (
                  <button
                    key={language.code}
                    role="menuitem"
                    onClick={() => handleLanguageChange(language)}
                    onKeyDown={(e) => handleKeyDown(e, language)}
                    className={`w-full text-left px-4 py-3 font-[family-name:var(--font-poppins)] text-sm transition-all duration-200 flex items-center gap-3 ${
                      selectedLanguage === language.name
                        ? "bg-[#008A01] text-white"
                        : "text-gray-800 hover:bg-gray-50 hover:text-[#008A01]"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    aria-selected={selectedLanguage === language.name}
                  >
                    <span className="text-xl">{language.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-medium">{language.name}</span>
                      <span className={`text-xs ${
                        selectedLanguage === language.name
                          ? "text-white/80"
                          : "text-gray-500"
                      }`}>
                        {language.nativeName}
                      </span>
                    </div>
                    {selectedLanguage === language.name && (
                      <svg
                        className="w-4 h-4 ml-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
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
