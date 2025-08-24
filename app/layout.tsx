import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ระบบประเมินการทำงาน - Employee Work Evaluation System",
  description: "ระบบประเมินผลการทำงานพนักงานออนไลน์ พร้อมสร้าง PDF รายงานผลการประเมิน",
  keywords: "ประเมินการทำงาน, PDF, รายงาน, HR, พนักงาน, ระบบประเมิน",
  authors: [{ name: "Employee Evaluation System" }]
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
        className="antialiased font-sarabun"
        style={{ fontFamily: '"Sarabun", "Arial", sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
