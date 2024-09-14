import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const dm_Sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emarah",
  description: "Start Your Anonymous Adventure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(dm_Sans.className, "antialiased bg-[#eaeefe]")}>
        {children}
      </body>
    </html>
  );
}
