import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "../context/AuthContext.js";
import Navbar from "@/components/Navbar.jsx";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Blog Management App",
  description: "Blog Management App by Vinay H C",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
