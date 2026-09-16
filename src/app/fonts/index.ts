import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const generalSans = localFont({
  src: [
    { path: "./GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./GeneralSans-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./GeneralSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});
