import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#4f46e5",
}

export const metadata: Metadata = {
  title: "Couch to 5K Guide",
  description: "A progressive web app to guide you through the Couch to 5K running program",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "C25K Guide",
  },
  generator: 'v0.dev',
  applicationName: "C25K Guide",
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "C25K Guide",
    title: "Couch to 5K Guide",
    description: "A progressive web app to guide you through the Couch to 5K running program",
  },
  twitter: {
    card: "summary",
    title: "Couch to 5K Guide",
    description: "A progressive web app to guide you through the Couch to 5K running program",
  },
}

// Register service worker
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      const version = process.env.NEXT_PUBLIC_BUILD_VERSION || '1.0.0';
      navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      }).then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        // Send version to service worker
        registration.active?.postMessage({
          type: 'SET_VERSION',
          version: version
        });
      }).catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
    }
  });
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
