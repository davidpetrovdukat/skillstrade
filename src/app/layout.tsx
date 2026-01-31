import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Nothing_You_Could_Do } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/layout/CookieBanner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const nothingYouCouldDo = Nothing_You_Could_Do({
  variable: "--font-nothing-you-could-do",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Skill Trade - Brutalist Freelance Platform",
  description: "Access the top 1% of global creative talent.",
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
  }
};

import { Providers } from "@/components/providers/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} ${nothingYouCouldDo.variable} antialiased font-heading`}
      >
        <Providers>
          {children}
        </Providers>
        <CookieBanner />
      </body>
    </html>
  );
}

