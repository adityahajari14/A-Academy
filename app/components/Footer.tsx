"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white w-full">

      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row">
        {/* Left Section - Logo & Button */}
        <div className="px-6 md:px-32 py-8 md:py-12 md:w-1/2 flex flex-col items-start gap-8">
          <div className="flex flex-col">
            <Image
              src="/Logo.svg"
              alt="A+ Academy"
              width={140}
              height={140}
            />
          </div>

          {/* Main Headlines Stacked */}
          <div className="flex flex-col gap-1">
            <h2 className="font-[family-name:var(--font-inter)] text-xl md:text-2xl font-[500] text-black leading-tight">
              Next Step Academy
            </h2>
            <h3 className="font-[family-name:var(--font-inter)] text-xl md:text-2xl font-[500] text-black leading-tight">
              Where progress begins.
            </h3>
          </div>

          {/* CTA Button */}
          <Link
            href="#contact"
            className="font-[family-name:var(--font-inter)] bg-[#008A01] hover:bg-[#00800F] text-white text-base font-[500] px-8 py-2 rounded-full transition-all duration-300 hover:shadow-lg"
          >
            Drop a line
          </Link>
        </div>

        {/* Right Section - Contact & Social with Border */}
        <div className="md:w-1/2 border-l-2 border-t-2 border-[#008A01] rounded-tl-[4rem] pl-8 md:pl-16 pt-8 md:pt-12 pr-6 md:pr-12 py-8 md:py-12 flex flex-col gap-20 justify-between">
          <div className="flex flex-col md:flex-row justify-start gap-120 md:gap-40">
            {/* Contact Section */}
            <div className="flex flex-col gap-3">
              <p className="font-[family-name:var(--font-inter)] text-xs font-bold text-[#CF7A47] uppercase tracking-wider">
                Contact
              </p>
              <div className="font-[family-name:var(--font-inter)] text-sm md:text-base text-black space-y-1">
                <p>+1 (323) 275-1718</p>
                <p>hello@logoissum.com</p>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="flex flex-col gap-4">
              <p className="font-[family-name:var(--font-inter)] text-xs font-bold text-[#CF7A47] uppercase tracking-wider">
                Follow Us
              </p>
              <div className="flex gap-2">
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 border-1 border-[rgba(207,122,71,0.4)] rounded-full hover:scale-110 transition-all duration-300"
                >
                  <Image
                    src="/icons/instagramblank.svg"
                    alt="Instagram"
                    width={20}
                    height={20}
                  />
                </Link>
                <Link
                  href="https://wa.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 border-1 border-[rgba(207,122,71,0.4)] rounded-full hover:scale-110 transition-all duration-300"
                >
                  <Image
                    src="/icons/whatsappblank.svg"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                  />
                </Link>
                <Link
                  href="https://telegram.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 border-1 border-[rgba(207,122,71,0.4)] rounded-full hover:scale-110 transition-all duration-300"
                >
                  <Image
                    src="/icons/telegramblank.svg"
                    alt="Telegram"
                    width={20}
                    height={20}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright */}
          <div>
            <p className="font-[family-name:var(--font-inter)] text-xs text-gray-400">
              © 2023 — Copyright
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
