import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/public/components/Navbar";
import Footer from "@/public/components/Footer";
import SessionWrapper from "@/public/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GetMeACoffee - A Platform to get funds",
  description: "A platform that funds your projects",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionWrapper>
          <Navbar />
          <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#166534_100%)]"></div>
          <div className="min-h-[89vh]">
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
