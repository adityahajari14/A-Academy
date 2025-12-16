"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Founder {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedin: string;
}

const foundersData: Founder[] = [
  {
    id: 1,
    name: "Nevak",
    title: "Manager",
    bio: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    image: "/Founder.png",
    linkedin: "https://linkedin.com/in/nevak",
  },
  {
    id: 2,
    name: "Sarah",
    title: "Co-Founder",
    bio: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    image: "/Founder.png",
    linkedin: "https://linkedin.com/in/sarah",
  },
];

export default function Founders() {
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFocusedIndex((prev) => (prev + 1) % foundersData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextIndex = (focusedIndex + 1) % foundersData.length;
  const focusedFounder = foundersData[focusedIndex];
  const nextFounder = foundersData[nextIndex];

  return (
    <section style={{ width: "100%", backgroundColor: "white", padding: "64px 80px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "48px", fontWeight: "bold", color: "#111827", marginBottom: "32px" }}>
          Founders
        </h2>

        <p style={{ color: "#374151", fontSize: "18px", lineHeight: "1.75", marginBottom: "64px", maxWidth: "900px" }}>
          Next Step Academy was founded with a clear educational vision: to
          provide students with professional, personal, and high-quality support
          on their path to academic success and achievement in the matriculation
          exams. The academy was established especially for students who seek to
          realize their full potential in a supportive, encouraging, and
          goal-oriented environment
        </p>

        {/* Cards Container */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          
          {/* Focused Card */}
          <div
            key={focusedIndex}
            style={{
              width: "700px",
              height: "420px",
              backgroundColor: "#008A01",
              borderRadius: "24px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ position: "relative", width: "280px", height: "420px", flexShrink: 0 }}>
              <Image src={focusedFounder.image} alt={focusedFounder.name} fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, color: "white" }}>
              <div>
                <h3 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "4px" }}>
                  Hi, I'm {focusedFounder.name}
                </h3>
                <p style={{ fontSize: "20px", marginBottom: "16px" }}>
                  I work as {focusedFounder.title}
                </p>
                <p style={{ fontSize: "14px", lineHeight: "1.6", opacity: 0.95 }}>
                  {focusedFounder.bio}
                </p>
              </div>
              <div style={{ marginTop: "16px" }}>
                <Image src="/Icons/linkedinfull.svg" alt="LinkedIn" width={80} height={24} />
              </div>
            </div>
          </div>

          {/* Blurred Card */}
          <div
            style={{
              width: "240px",
              height: "300px",
              backgroundColor: "#008A01",
              borderRadius: "16px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              opacity: 0.5,
              filter: "blur(6px)",
            }}
          >
            <div style={{ position: "relative", width: "100px", height: "300px", flexShrink: 0 }}>
              <Image src={nextFounder.image} alt={nextFounder.name} fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ padding: "12px", display: "flex", flexDirection: "column", justifyContent: "flex-start", flex: 1, color: "white", overflow: "hidden" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "4px" }}>
                Hi, I'm {nextFounder.name}
              </h3>
              <p style={{ fontSize: "12px", marginBottom: "8px" }}>
                I work as {nextFounder.title}
              </p>
              <p style={{ fontSize: "9px", lineHeight: "1.4", opacity: 0.95 }}>
                {nextFounder.bio.substring(0, 120)}...
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
