import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import InstallButton from "./components/InstallButton"

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
  icons: {
    icon: [
      { url: '/icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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

  // Handle install prompt
  let deferredPrompt: any;
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show the install button
    console.log('Install prompt available');
  });

  window.addEventListener('appinstalled', () => {
    console.log('App was installed');
    deferredPrompt = null;
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
      <body className={inter.className}>
        {children}
        <InstallButton />
      </body>
    </html>
  )
}
