import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Nothing_You_Could_Do } from "next/font/google";
import "./globals.css";

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
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  }
};

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
        {children}
      </body>
    </html>
  );
}

