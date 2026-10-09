import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/ui/Navbar";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://my-portfolio-heel1.vercel.app";

export const viewport: Viewport = {
  themeColor: "#0B1A22",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${PORTFOLIO_DATA.personal.name} | ${PORTFOLIO_DATA.personal.role}`,
  description: `${PORTFOLIO_DATA.personal.heroHeading} Portfolio of ${PORTFOLIO_DATA.personal.name}, featuring AI/ML projects (PitchIQ, PaperPilot, Insight AI), data analysis dashboards, and full-stack applications.`,
  keywords: [
    "Heel Soni",
    "AI/ML Developer",
    "Data Analyst",
    "Full-Stack Engineer",
    "PitchIQ",
    "PaperPilot",
    "Insight AI",
    "FastAPI",
    "React",
    "Python",
    "Machine Learning",
    "Power BI",
    "Portfolio",
  ],
  authors: [{ name: PORTFOLIO_DATA.personal.name, url: siteUrl }],
  creator: PORTFOLIO_DATA.personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${PORTFOLIO_DATA.personal.name} — AI/ML Developer & Data Analyst`,
    description: PORTFOLIO_DATA.personal.heroHeading,
    siteName: `${PORTFOLIO_DATA.personal.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${PORTFOLIO_DATA.personal.name} - AI/ML Developer & Data Analyst Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PORTFOLIO_DATA.personal.name} — AI/ML Developer & Data Analyst`,
    description: PORTFOLIO_DATA.personal.heroHeading,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Person schema
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PORTFOLIO_DATA.personal.name,
    jobTitle: "AI/ML Developer & Data Analyst",
    description: PORTFOLIO_DATA.personal.heroHeading,
    url: siteUrl,
    email: PORTFOLIO_DATA.personal.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Anand",
      addressRegion: "Gujarat",
      addressCountry: "India",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "A.D. Patel Institute of Technology",
    },
    sameAs: [
      PORTFOLIO_DATA.personal.linkedin,
      PORTFOLIO_DATA.personal.github,
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Analytics",
      "Python",
      "FastAPI",
      "React",
      "Power BI",
      "SQL",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SmoothScrollProvider>
            <NoiseOverlay />
            <CustomCursor />
            <Navbar />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
