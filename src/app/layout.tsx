import "./globals.css";
import { Playfair_Display, Poppins, Montserrat, Inter, Open_Sans } from "next/font/google";
import type { Metadata } from "next";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "A+ Academy - Where Progress Begins",
  description: "A+ Academy - Mathematics education with personalized approach, clear explanations, and individual attention for every student.",
  icons: {
    icon: [
      { url: "/Logo.svg", type: "image/svg+xml" },
      { url: "/Logo.svg", type: "image/svg+xml", sizes: "any" },
    ],
    apple: [
      { url: "/Logo.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} ${montserrat.variable} ${inter.variable} ${openSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
