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
  title: {
    default: "Guide to Gear - Your Ultimate Resource for Equipment & Tools",
    template: "%s | Guide to Gear"
  },
  description: "Comprehensive guides, reviews, and recommendations for gear, equipment, and tools. Find the best products for your needs with expert advice and detailed comparisons.",
  keywords: ["gear", "equipment", "tools", "reviews", "guides", "recommendations", "outdoor gear", "camping equipment", "hiking gear", "fishing gear", "hunting gear"],
  authors: [{ name: "Guide to Gear" }],
  creator: "Guide to Gear",
  publisher: "Guide to Gear",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.guidetogear.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.guidetogear.com',
    siteName: 'Guide to Gear',
    title: 'Guide to Gear - Your Ultimate Resource for Equipment & Tools',
    description: 'Comprehensive guides, reviews, and recommendations for gear, equipment, and tools. Find the best products for your needs with expert advice and detailed comparisons.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Guide to Gear - Equipment and Tools Resource',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guide to Gear - Your Ultimate Resource for Equipment & Tools',
    description: 'Comprehensive guides, reviews, and recommendations for gear, equipment, and tools.',
    images: ['/og-image.jpg'],
    creator: '@guidetogear',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
