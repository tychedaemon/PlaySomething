import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import { MusicProviderWrapper } from "@/providers/music-provider-wrapper";
import { KeyboardHandler } from "@/components/keyboard-handler";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://playsomething.app"),
  title: {
    default: "PlaySomething | Don't know what to listen to?",
    template: "%s | PlaySomething",
  },
  description:
    "A beautiful music discovery experience. Press a button and discover amazing songs and albums.",
  keywords: [
    "music",
    "discovery",
    "apple music",
    "songs",
    "albums",
    "recommendations",
  ],
  authors: [{ name: "PlaySomething" }],
  creator: "PlaySomething",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://playsomething.app",
    siteName: "PlaySomething",
    title: "PlaySomething | Don't know what to listen to?",
    description:
      "A beautiful music discovery experience. Press a button and discover amazing songs and albums.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PlaySomething",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlaySomething | Don't know what to listen to?",
    description:
      "A beautiful music discovery experience. Press a button and discover amazing songs and albums.",
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

export const viewport: Viewport = {
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#090909] text-[#F5F5F5]">
        <MusicProviderWrapper>
          {children}
          <KeyboardHandler />
        </MusicProviderWrapper>
      </body>
    </html>
  );
}
