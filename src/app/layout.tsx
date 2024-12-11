import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
// import { Analytics } from '@vercel/analytics/next';0
// import { SpeedInsights } from '@vercel/speed-insights/next';

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
      <AuthProvider>
        <body className={dm_Sans.className}>
          {children}
          {/* <Analytics /> */}
          {/* <SpeedInsights /> */}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
