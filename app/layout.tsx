import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
//import ThemeProvider from "../context/useThemeProvider";

import "./styles/index.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  //metadataBase: new URL('https://n-services.business'),

  title: "N-services Agency",
  description: "",
  keywords: [""],

  authors: [
    {
      name: "JMD Group",
      url: "https://jmdgrouprdc.com",
    },
  ],

  creator: "JMD Concept / JMD Group",
  publisher: "JMD Group",
  category: "business",

  openGraph: {
    title: "N-services Agency",
    description: "Connecter les restaurants à l'expérience digital moderne",
    type: "website",
    locale: "fr_FR",
    url: "#",
    siteName: "N-services Agency",
    images: [
      {
        url: "https://n-services.business/N-services-agency-blanc.PNG",
        width: 1200,
        height: 630,
        alt: "JMD RestoConnect - Siège social Kinshasa, RDC",
      },
      {
        url: "https://n-services.business/N-services-agency-blanc.PNG", // Optionnel : une image carrée pour certains affichages
        width: 600,
        height: 600,
        alt: "Logo JMD Group",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "",
    description: "Connecter les restaurants à l'expérience digital moderne",
    images: ["https://n-services.business/logos/N-services-agency-blanc.PNG"],
  },

  alternates: {
    canonical: "https://n-services.business/",
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

  icons: {
    icon: [
      { url: "favicon_io/favicon.ico", rel: "icon" },
      {
        url: "favicon_io/favicon-16x16.png",
        rel: "icon",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "favicon_io/favicon-32x32.png",
        rel: "icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "favicon_io/apple-touch-icon.png",
      },
    ],
  },

  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "N-Services Agency",
      url: "#",
      logo: "https://n-services.business/N-services-agency-blanc.PNG",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kinshasa",
        addressCountry: "CD",
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const isProd = process.env.NODE_ENV === "production";

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/*  {isProd && (
        <>
          <Script
            src="#"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-L0VNPP269D');
              `}
          </Script>
        </>
      )} */}

      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
