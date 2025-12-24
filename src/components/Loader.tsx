"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start splash animation after a brief delay
    const startTimer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);

    // Start fadeout before completing
    const fadeoutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);

    // Complete loader after fadeout animation
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 300);
    }, 2000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(fadeoutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Splash circles */}
      <div className="absolute inset-0 overflow-hidden">
        {isAnimating && (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-[#008A01]/10 animate-splash-expand" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-[#008A01]/5 animate-splash-expand-delayed" />
          </>
        )}
      </div>

      {/* Logo */}
      <div
        className={`relative z-10 transition-all duration-700 ${
          isAnimating && !isFadingOut
            ? "opacity-100 scale-100"
            : isFadingOut
            ? "opacity-0 scale-95"
            : "opacity-0 scale-75"
        }`}
      >
        <div className="relative">
          <Image
            src="/Logo.svg"
            alt="A+ Academy Logo"
            width={180}
            height={90}
            className={`w-32 h-16 sm:w-40 sm:h-20 md:w-48 md:h-24 lg:w-[180px] lg:h-[90px] transition-opacity duration-500 ${
              isFadingOut ? "" : "animate-pulse-subtle"
            }`}
            priority
          />
          {/* Glow effect */}
          {/* <div className={`absolute inset-0 bg-[#008A01]/20 blur-2xl -z-10 transition-opacity duration-500 ${
            isFadingOut ? "opacity-0" : "animate-pulse-glow"
          }`} /> */}
        </div>
      </div>

    </div>
  );
}

