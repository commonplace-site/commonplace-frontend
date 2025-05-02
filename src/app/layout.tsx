import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./../styles.scss"
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import UserHeader from "@/components/user-header/UserHeader";
import { ThemeProvider } from "./ThemeContext";
import { SpaceBackground } from "@/components/space-background/SpaceBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CommonPlace",
  description: "Common Place",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider>
        <body className={`${geistMono} ${geistSans} min-h-screen flex flex-col antialiased`}>
          <SpaceBackground />
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              <UserHeader />
              <div>{children}</div>
            </main>
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
