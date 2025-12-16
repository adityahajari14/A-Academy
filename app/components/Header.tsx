"use client";

import Image from "next/image";
import { useState } from "react";

interface HeaderProps {
  onLanguageChange: (language: string) => void;
  selectedLanguage: string;
}

export default function Header({
  onLanguageChange,
  selectedLanguage,
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "he", name: "Hebrew" },
  ];

  const handleLanguageChange = (language: string) => {
    onLanguageChange(language);
    setIsDropdownOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-white">
      <div className="w-full px-12 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/Logo.svg"
            alt="A+ Academy Logo"
            width={60}
            height={30}
            className="cursor-pointer"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-12">
          {/* About Us */}
          <a
            href="#about"
            className="font-[family-name:var(--font-poppins)] text-gray-800 text-sm font-[500] hover:text-[#00B140] transition-colors duration-200"
          >
            About Us
          </a>

          {/* Contact Us */}
          <a
            href="#contact"
            className="font-[family-name:var(--font-poppins)] text-gray-800 text-sm font-[500] hover:text-[#00B140] transition-colors duration-200"
          >
            Contact Us
          </a>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="font-[family-name:var(--font-poppins)] text-gray-800 text-base font-[500] hover:text-[#00B140] transition-colors duration-200 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md"
            >
              {selectedLanguage}
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
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
              <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.name)}
                    className={`w-full text-left px-4 py-3 font-[family-name:var(--font-poppins)] text-sm transition-colors duration-200 ${
                      selectedLanguage === language.name
                        ? "bg-[#00B140] text-white"
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
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
