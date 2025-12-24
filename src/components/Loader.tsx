"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fadeout before completing
    const fadeoutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);

    // Complete loader after fadeout animation
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2000);

    return () => {
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
      {/* Logo */}
      <div className="relative z-10">
        <Image
          src="/Logo.svg"
          alt="A+ Academy Logo"
          width={240}
          height={120}
          className="w-40 h-20 sm:w-52 sm:h-26 md:w-64 md:h-32 lg:w-[240px] lg:h-[120px] xl:w-[280px] xl:h-[140px]"
          priority
        />
      </div>
    </div>
  );
}

