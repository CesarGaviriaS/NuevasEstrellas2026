import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import SocialSidebar from "../components/SocialSidebar";
import JsonLd from "../components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nuevasestrellas.com'),
  title: "Nuevas Estrellas | Desarrollo de Talento Juvenil",
  description: "Impulsando el desarrollo integral de jóvenes futbolistas talentosos de Colombia. Torneo Nuevas Estrellas, scouting profesional y formación deportiva.",
  keywords: ["futbol", "colombia", "talento juvenil", "scouting", "torneo", "nuevas estrellas", "deporte"],
  openGraph: {
    title: "Nuevas Estrellas | Desarrollo de Talento Juvenil",
    description: "Impulsando el desarrollo integral de jóvenes futbolistas talentosos de Colombia.",
    url: "https://nuevasestrellas.com",
    siteName: "Nuevas Estrellas",
    images: [
      {
        url: "/logo nuevas estrellas con letras.png",
        width: 1200,
        height: 630,
        alt: "Nuevas Estrellas - Desarrollo de Talento",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuevas Estrellas | Desarrollo de Talento Juvenil",
    description: "Impulsando el desarrollo integral de jóvenes futbolistas talentosos de Colombia.",
    images: ["/logo nuevas estrellas con letras.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable}`}>
      <head>
        <link rel="icon" href="/Logo copa simple.png" type="image/png" />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>
          <JsonLd data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Nuevas Estrellas",
            "url": "https://nuevasestrellas.com",
            "logo": "https://nuevasestrellas.com/Logo copa simple.png",
            "sameAs": [
              "https://www.facebook.com/nuevasestrellas",
              "https://www.instagram.com/nuevasestrellas"
            ],
            "description": "Impulsando el desarrollo integral de jóvenes futbolistas talentosos de Colombia."
          }} />
          {children}
          <SocialSidebar />
        </ClientBody>
      </body>
    </html>
  );
}
