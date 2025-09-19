import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Patrick Environmetal",
  description: `"Where Experience and Professionalism Make The Difference" Since 1971`,

  openGraph: {
    title: "Patrick Wildfire - Professional Fire Suppression Services",
    description: "Professional wildfire suppression and fire services with 52+ years of experience. Serving 20+ states with expert firefighting solutions.",
    url: "https://patrick-coral.vercel.app", // Replace with your actual domain
    siteName: "Patrick Wildfire",
    images: [
      {
        url: "/og-image.png", // This is the image that will show when shared
        width: 1200,
        height: 630,
        alt: "Patrick Wildfire - Professional Fire Suppression Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
