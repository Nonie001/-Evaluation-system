import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ระบบประเมินการทดลองงาน - สภาเครือข่ายช่วยเหลือด้านมนุษยธรรม",
  description: "ระบบประเมินการทดลองงานเจ้าหน้าที่ออนไลน์ พร้อมสร้าง PDF รายงานผลการประเมิน",
  keywords: "ประเมินการทดลองงาน, PDF, รายงาน, HR, เจ้าหน้าที่",
  authors: [{ name: "สภาเครือข่ายช่วยเหลือด้านมนุษยธรรม สำนักจุฬาราชมนตรี" }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sarabun`}
        style={{ fontFamily: '"Sarabun", "Arial", sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
