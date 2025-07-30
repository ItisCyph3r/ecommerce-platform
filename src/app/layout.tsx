import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'ShopHub - Your Premium E-commerce Destination',
    template: '%s | ShopHub'
  },
  description: 'Discover amazing products across electronics, clothing, books, home & garden, sports, beauty, toys, and automotive categories. Shop with confidence at ShopHub.',
  keywords: ['e-commerce', 'online shopping', 'electronics', 'clothing', 'books', 'home', 'sports', 'beauty', 'toys', 'automotive'],
  authors: [{ name: 'ShopHub Team' }],
  creator: 'ShopHub',
  publisher: 'ShopHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://shophub-demo.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ShopHub - Your Premium E-commerce Destination',
    description: 'Discover amazing products across all categories. Shop with confidence at ShopHub.',
    url: 'https://shophub-demo.vercel.app',
    siteName: 'ShopHub',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ShopHub - Premium E-commerce Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShopHub - Your Premium E-commerce Destination',
    description: 'Discover amazing products across all categories. Shop with confidence at ShopHub.',
    images: ['/og-image.jpg'],
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
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
