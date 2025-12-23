"use client";

import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  language: string;
}

export default function Footer({ language }: FooterProps) {
  const isHebrew = language === "he";
  const currentYear = new Date().getFullYear();

  const content = {
    en: {
      academyName: "A+ Academy",
      tagline: "Where progress begins.",
      contact: "Contact",
      phone: "0526653443",
      email: "aplusacademy2525@gmail.com",
      address: "Ma'alot-tarshiha, Rehov HaKnesiyot 10",
      followUs: "Follow Us",
      copyright: `© ${currentYear} — A+ Academy. All rights reserved.`,
    },
    he: {
      academyName: "אקדמיית A+",
      tagline: "היכן מתחילה ההתקדמות.",
      contact: "יצירת קשר",
      phone: "0526653443",
      email: "aplusacademy2525@gmail.com",
      address: "מעלות-תרשיחא, רחוב הכנסיות 10",
      followUs: "עקבו אחרינו",
      copyright: `© ${currentYear} — A+ Academy. כל הזכויות שמורות.`,
    },
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  return (
    <footer
      className="bg-white w-full flex flex-col lg:flex-row gap-6 sm:gap-8 items-start pt-12 sm:pt-14 md:pt-16 pb-0"
      dir={isHebrew ? "rtl" : "ltr"}
    >
      {/* Left Column - Logo and Name */}
      <div className="flex-1 flex flex-col gap-4 sm:gap-5 md:gap-6 px-4 sm:px-6 md:px-12 lg:px-20 w-full">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          {/* Logo */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[71px] lg:h-[71px]">
            <Image
              src="/Logo.svg"
              alt="Academy Logo"
              width={71}
              height={71}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Academy Name and Tagline */}
          <div className="font-[family-name:var(--font-inter)] font-medium text-[#36382e] text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-[1.2] tracking-tight max-w-full lg:max-w-[496px]">
            <p className="mb-0">{currentContent.academyName}</p>
            <p>{currentContent.tagline}</p>
          </div>
        </div>
      </div>

      {/* Right Column - Contact and Social */}
      <div className="flex-1 border-l-0 lg:border-l border-t border-[#008a01] flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-48 px-4 sm:px-6 md:px-12 lg:px-20 pt-8 sm:pt-10 md:pt-12 lg:pt-16 pb-8 sm:pb-10 md:pb-12 lg:pb-16 w-full">
        {/* Contact and Social Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-start sm:justify-between gap-6 sm:gap-8 max-w-full lg:max-w-[496px]">
          {/* Contact Section */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="font-[family-name:var(--font-inter)] font-semibold text-[#008A01] text-xs sm:text-sm uppercase tracking-wide">
              {currentContent.contact}
            </p>
            <div className="font-[family-name:var(--font-inter)] font-normal text-[#36382e] text-xs sm:text-sm leading-[1.5] flex flex-col gap-1">
              <p className="hover:text-[#008a01] transition-colors cursor-pointer">
                {currentContent.phone}
              </p>
              <p className="hover:text-[#008a01] transition-colors cursor-pointer break-all">
                {currentContent.email}
              </p>
              <p>{currentContent.address}</p>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="font-[family-name:var(--font-inter)] font-semibold text-[#008A01] text-xs sm:text-sm uppercase tracking-wide">
              {currentContent.followUs}
            </p>
            <div className="flex gap-2 sm:gap-3">
              <Link
                href="https://instagram.com/A.plus.academy25"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] hover:scale-110 transition-transform duration-300"
              >
                <Image
                  src="/Icons/instagram.svg"
                  alt="Instagram"
                  width={50}
                  height={50}
                  className="w-full h-full"
                />
              </Link>
              <Link
                href="https://wa.me/0526653443"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] hover:scale-110 transition-transform duration-300"
              >
                <Image
                  src="/Icons/whatsapp.svg"
                  alt="Whatsapp"
                  width={50}
                  height={50}
                  className="w-full h-full"
                />
              </Link>
              {/* <Link
                href="#"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] hover:scale-110 transition-transform duration-300"
              >
                <Image
                  src="/Icons/telegram.svg"
                  alt="Telegram"
                  width={50}
                  height={50}
                  className="w-full h-full"
                />
              </Link> */}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="font-[family-name:var(--font-inter)] font-normal text-[#36382e] text-xs leading-[1.5] opacity-50">
          {currentContent.copyright}
        </p>
      </div>
    </footer>
  );
}
