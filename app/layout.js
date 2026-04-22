import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Analytics } from "@vercel/analytics/next"
import RecaptchaProvider from "@/Components/RecaptchaProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Patrick Environmental",
  description: `"Where Experience and Professionalism Make The Difference" Since 1971`,
  alternates: {
    canonical: 'https://www.patrickfire.com',
  },
  openGraph: {
    title: "Patrick Environmental - Professional Fire Suppression Services",
    description: "Professional wildfire suppression and fire services with 52+ years of experience. Serving 20+ states with expert firefighting solutions.",
    url: "https://www.patrickfire.com",
    siteName: "Patrick Environmental",
    images: [
      {
        url: "https://www.patrickfire.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Patrick Environmental - Professional Fire Suppression Services",
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
        <RecaptchaProvider>
          <Header />
          {children}
          <Analytics />
          <Footer />
        </RecaptchaProvider>
      </body>
    </html>
  );
}
